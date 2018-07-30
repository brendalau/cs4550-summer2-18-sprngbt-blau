package wbdv.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import wbdv.models.Course;
import wbdv.models.Lesson;
import wbdv.models.Module;
import wbdv.models.Widget;
import wbdv.repositories.LessonRepository;
import wbdv.repositories.WidgetRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class WidgetService {
	@Autowired
	LessonRepository lessonRepository;
	
	@Autowired
	WidgetRepository widgetRepository;
	
	@GetMapping("/api/widget")
	public List<Widget> findAllWidgets() {
		return (List<Widget>) widgetRepository.findAll();
	}
	
	@GetMapping("/api/widget/{widgetId}")
	  public Optional<Widget> findWidgetById(@PathVariable("widgetId") String widgetId) {
	    int id = Integer.parseInt(widgetId);
	    return widgetRepository.findById(id);
	}
	
	@GetMapping("/api/lesson/{lessonId}/widget")
	public List<Widget> findWidgetsByLesson(@PathVariable("lessonId") int lessonId) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if(data.isPresent()) {
			Lesson lesson = data.get();
			return lesson.getWidgets();
		}
		return null;		
	}
	
	@PostMapping("/api/lesson/{lessonId}/widget")
	public void createWidget(@PathVariable("lessonId") int lessonId,
							   @RequestBody Widget newWidget) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		
		if (data.isPresent()) {
			Lesson lesson = data.get();
			newWidget.setLesson(lesson);
			widgetRepository.save(newWidget);
		}		
	}
	
	@PutMapping("/api/widget/{widgetId}")
	public void updateWidget(@PathVariable("widgetId") int widgetId, @RequestBody Widget widget) {
		Widget data = widgetRepository.findWidgetById(widgetId);
		
		if (data != null) {
			data.setId(widget.getId());
			data.setTitle(widget.getTitle());
			data.setText(widget.getText());
			data.setSize(widget.getSize());
			data.setHref(widget.getHref());
			data.setSrc(widget.getSrc());
			data.setListItems(widget.getListItems());
			data.setListType(widget.getListType());
			data.setLesson(widget.getLesson());
			widgetRepository.save(data);
		}
	}
	
	@PostMapping("/api/lesson/{lessonId}")
	public void saveWidgets(@PathVariable("lessonId") int lessonId,
							@RequestBody List<Widget> widgets) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		
		if (data.isPresent()) {
			Lesson lesson = data.get();
			widgetRepository.deleteAll(lesson.getWidgets());
			for (Widget widget : widgets) {
				widget.setLesson(lesson);
			}
			widgetRepository.saveAll(widgets);
		}		
	}
}
