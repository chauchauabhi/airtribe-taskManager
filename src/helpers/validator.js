class validator {
    static validatetaskInfo(taskInfo, taskData) {
      if(taskInfo.hasOwnProperty("name") &&
        taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("taskPriority") && this.validateUniqueTaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "task has been added"
          };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "task id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "task Info is malformed please provide all the properties"
        }
    }
  
    static validateUniqueTaskId(taskInfo, taskData) {
      let valueFound = taskData.tasks.some(el => el.taskId === taskInfo.courseId);
      if(valueFound) return false;
      return true;
    }
  
    static validateAverageRating(averageRating) {
      if(averageRating.hasOwnProperty("rating") && this.isInt(averageRating.rating)) {
        return true;
      }
      return false;
    }
  
    static isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }
  }
  
  module.exports = validator;