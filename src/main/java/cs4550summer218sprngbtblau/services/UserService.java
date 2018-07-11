package cs4550summer218sprngbtblau.services;

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

import cs4550summer218sprngbtblau.models.User;
import cs4550summer218sprngbtblau.repositories.UserRepository;

@RestController
public class UserService {
    @Autowired
	UserRepository repository;
	
	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") int id) {
		repository.deleteById(id);
	}
	
	@PostMapping("/api/user")
	public User createUser(@RequestBody User user) {
		return repository.save(user);
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
		
	@GetMapping("/api/user")
	public List<User> findAllUsers() {
		return (List<User>) repository.findAll();
	}

	@PutMapping("/api/user/{userId}")
	public User updateUser(@PathVariable("userId") int userId, @RequestBody User newUser) {
		Optional<User> data = repository.findById(userId);
		
		if (data.isPresent()) {
			User user = data.get();
			user.setUsername(newUser.getUsername());
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
			user.setRole(newUser.getRole());
			user.setPhone(newUser.getPhone());
			user.setEmail(newUser.getEmail());
			user.setDob(newUser.getDob());
			repository.save(user);
			return user;
		}
		return null;
	}
	
	@PostMapping("/api/register")
	public User register(@RequestBody User user, HttpSession session) {
		User data = repository.findUserByUsername(user.getUsername());
		
		if (data != null) {
			throw new IllegalArgumentException("Username is already taken");
		} else {
			User currUser = repository.save(user);
			session.setAttribute("user", currUser);
			return currUser;
		}
	}
	
	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") int userId) {
		Optional<User> data = repository.findById(userId);
		
		if (data.isPresent()) {
			return data.get();
		}
		return null;
	}
	
	@GetMapping("/api/user/{username}")
	public User findUserByUsername(@PathVariable("username") String username) {
		User data = repository.findUserByUsername(username);
		
		if (data != null) {
			return data;
		}
		return null;
	}
	
	@GetMapping("/api/user/{password}")
	public User findUserByCredentials(String username, @PathVariable("password") String password) {
		User data = repository.findUserByCredentials(username, password);
		
		if (data != null) {
			return data;
		}
		return null;
	}
	
	@GetMapping("/api/profile")
	public Optional<User> profile(HttpSession session) {
		User currUser = (User) session.getAttribute("user");
		return repository.findById(currUser.getId());
	}
	
	@PutMapping("/api/profile")
	public User updateProfile(@RequestBody User updatedUser) {
		User data = repository.findUserByUsername(updatedUser.getUsername());
		User user = data;
		
		if (data != null) {
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