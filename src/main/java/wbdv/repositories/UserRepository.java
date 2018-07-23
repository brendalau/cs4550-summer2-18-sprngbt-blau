package wbdv.repositories;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import wbdv.models.User;
public interface UserRepository extends CrudRepository<User, Integer> {
	@Query("SELECT u FROM User u WHERE u.username=:username AND u.password=:password")
	User findUserByCredentials(
		@Param("username") String username, 
		@Param("password") String password);
	
	@Query("SELECT u FROM User u WHERE u.username=:username")
	User findUserByUsername(
		@Param("username") String username);
}
