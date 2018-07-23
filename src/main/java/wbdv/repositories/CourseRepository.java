package wbdv.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import wbdv.models.Course;

public interface CourseRepository extends CrudRepository<Course, Integer> {
	@Query("SELECT c FROM Course c WHERE c.id=:courseId")
	Course findCourseById(
		@Param("courseId") int courseId);
}

