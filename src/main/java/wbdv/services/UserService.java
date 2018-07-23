package wbdv.services;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import wbdv.models.User;
import wbdv.repositories.UserRepository;

@RestController
public class UserService {
    @Autowired
	UserRepository repository;
	
    @PostMapping("/api/user")
	public User createUser(@RequestBody User user) {
		return repository.save(user);
	}
    
    @GetMapping("/api/user")
	public List<User> findAllUsers() {
		return (List<User>) repository.findAll();
	}
    
    @GetMapping("/api/user/id/{userId}")
	public Optional<User> findUserByUserId(@PathVariable("userId") String userId) {
		int id = Integer.parseInt(userId);
		return repository.findById(id);
	}
    
    @PutMapping("/api/user")
	public User updateUser(@RequestBody User newUser) {
		User data = repository.findUserByUsername(newUser.getUsername());
		
		if (data != null) {
			data.setPassword(newUser.getPassword());
			data.setFirstName(newUser.getFirstName());
			data.setLastName(newUser.getLastName());
			data.setRole(newUser.getRole());
			repository.save(data);
			return data;
		}
		return null;
	}
    
	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") int id) {
		repository.deleteById(id);
	}
	
	@GetMapping("/api/user/username/{username}")
	public User findUserByUsername(@PathVariable("username") String username) {
		User data = repository.findUserByUsername(username);
		
		if (data != null) {
			return data;
		}
		return null;
	}
	
	@PostMapping("/api/register")
	public User register(@RequestBody User user, HttpSession session, HttpServletResponse response) {
		User data = repository.findUserByUsername(user.getUsername());
		
		if (data == null) {
			session.setAttribute("user", user);
			response.setStatus(HttpServletResponse.SC_CREATED);
		} else {
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		}
		return data;
	}
	
	@PostMapping("/api/login")
	public User login(@RequestBody User user, HttpSession session, HttpServletResponse response) {
		User data = repository.findUserByCredentials(user.getUsername(), user.getPassword());
		
		if (data == null) {
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		} else {
			session.setAttribute("user", data);
		}
		return data;
	}
	
	@GetMapping("/api/profile")
	public Optional<User> initProfile(HttpSession session) {
		User currUser = (User) session.getAttribute("user");
		return repository.findById(currUser.getId());
	}
	
	@PutMapping("/api/profile")
	public User updateProfile(@RequestBody User updatedUser, HttpSession session) {
		User data = (User) session.getAttribute("user");
		User user = data;
		
		if (data != null) {
			user.setPassword(updatedUser.getPassword());
			user.setFirstName(updatedUser.getFirstName());
			user.setLastName(updatedUser.getLastName());
			user.setRole(updatedUser.getRole());
			user.setPhone(updatedUser.getPhone());
			user.setEmail(updatedUser.getEmail());
			user.setDob(updatedUser.getDob());
			repository.save(user);
		}
		return user;
	}
	
	@PostMapping("/api/logout")
	public void logout(HttpSession session) {
		session.setAttribute("user", null);
	}
}