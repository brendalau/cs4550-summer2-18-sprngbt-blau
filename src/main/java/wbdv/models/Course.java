package wbdv.models;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Course {
@Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int id;
  private String title;
  private String instuctor;
  @Temporal(TemporalType.TIMESTAMP)
  private Date created;
  @Temporal(TemporalType.TIMESTAMP)
  private Date modified;
  @OneToMany(mappedBy="course")
  private List<Module> modules;

public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getInstuctor() {
    return instuctor;
  }

  public void setInstuctor(String instuctor) {
    this.instuctor = instuctor;
  }

  public Date getCreated() {
    return created;
  }

  public void setCreated(Date created) {
    this.created = created;
  }

  public Date getModified() {
    return modified;
  }

  public void setModified(Date modified) {
    this.modified = modified;
  }
  
  public List<Module> getModules() {
		return modules;
  }

  public void setModules(List<Module> modules) {
		this.modules = modules;
  }
	
  public Course() {
	  java.util.Date date= new java.util.Date();
	  this.created = new Timestamp(date.getTime());
	  this.modified = new Timestamp(date.getTime());
	  this.modules = new ArrayList<Module>();
  };
}
