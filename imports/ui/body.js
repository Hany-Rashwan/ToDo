import { Template } from 'meteor/templating';
 
import './body.html';
import { Tasks } from '../api/tasks.js';

 
Template.task.helpers({
  tasks() {
     return Tasks.find({}, { sort: { createdAt: -1 } });
 },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },

   'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },

  'click .delete'() {
    Tasks.remove(this._id);
  }
  
});

