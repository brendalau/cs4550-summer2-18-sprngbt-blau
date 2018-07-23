package wbdv.services;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import wbdv.models.Course;
import wbdv.models.Module;
import wbdv.repositories.CourseRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class CourseService {
  @Autowired
  CourseRepository courseRepository;

  @GetMapping("/api/course")
  public Iterable<Course> findAllCourses() {
    return courseRepository.findAll();
  }

  @GetMapping("/api/course/{courseId}")
  public Optional<Course> findCourseById(@PathVariable("courseId") String courseId) {
    int id = Integer.parseInt(courseId);
    return courseRepository.findById(id);
  }

  @PostMapping("/api/course")
  public Course createCourse(@RequestBody Course course) {
    return courseRepository.save(course);
  }

  @DeleteMapping("/api/course/{courseId}")
  public void deleteCourse(@PathVariable("courseId") int id) {
    courseRepository.deleteById(id);
  }
  
  @PutMapping("/api/course/{courseId}")
	public Course updateCourse(@PathVariable("courseId") int courseId, @RequestBody Course course) {
		Course data = courseRepository.findCourseById(courseId);
		
		if (data != null) {
			java.util.Date date= new java.util.Date();
			
			data.setTitle(course.getTitle());
			data.setModified(new Timestamp(date.getTime()));
			data.setModules(course.getModules());
			courseRepository.save(data);
		}
		return null;
	}
}
