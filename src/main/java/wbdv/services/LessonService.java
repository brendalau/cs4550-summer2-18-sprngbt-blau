package wbdv.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import wbdv.models.Module;
import wbdv.models.Lesson;
import wbdv.repositories.ModuleRepository;
import wbdv.repositories.LessonRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class LessonService {
	@Autowired
	ModuleRepository moduleRepository;
	
	@Autowired
	LessonRepository lessonRepository;
	
	@PostMapping("/api/course/{courseId}/module/{moduleId}/lesson")
	public Lesson createLesson(@PathVariable("courseId") int courseId,
							   @PathVariable("moduleId") int moduleId,
							   @RequestBody Lesson newLesson) {
		Optional<Module> data = moduleRepository.findById(moduleId);
		
		if (data.isPresent()) {
			Module module = data.get();
			newLesson.setModule(module);
			return lessonRepository.save(newLesson);
		}
		return null;		
	}
	
	@DeleteMapping("/api/lesson/{lessonId}")
	public void deleteModule(@PathVariable("lessonId") int lessonId) {
		lessonRepository.deleteById(lessonId);
	}
	
	@GetMapping("/api/lesson")
	public List<Lesson> findAllLessons() {
		return (List<Lesson>) lessonRepository.findAll();
	}
	
	@GetMapping("/api/lesson/{lessonId}")
	  public Optional<Lesson> findLessonById(@PathVariable("lessonId") String lessonId) {
	    int id = Integer.parseInt(lessonId);
	    return lessonRepository.findById(id);
	  }
	
	@GetMapping("/api/course/{courseId}/module/{moduleId}/lesson")
	public List<Lesson> findAllLessonsForModule(@PathVariable("courseId") int courseId,
												@PathVariable("moduleId") int moduleId) {
		Optional<Module> data = moduleRepository.findById(moduleId);
		if(data.isPresent()) {
			Module module = data.get();
			return module.getLessons();
		}
		return null;		
	}
}
