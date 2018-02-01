import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";

import { EnvService } from "./env.service";

@Injectable()
export class TaskService {

    private STATUS_status = {
        'NEW': 'new',
        'PENDING_ON_OPS': 'ops',
        // 'ASSIGNED':'asg',
        'PENDING_INTERNAL_VALIDATION': 'int',
        'PENDING_EXTERNAL_VALIDATION': 'ext',
        'BUSINESS_VALIDATION_DONE': 'bvd',
        'LIVE_IN_PRODUCTION': 'cmp'
    };

    private status_STATUS = {
        'new': 'NEW',
        'ops': 'PENDING_ON_OPS',
        // 'asg': 'ASSIGNED',
        'int': 'PENDING_INTERNAL_VALIDATION',
        'ext': 'PENDING_EXTERNAL_VALIDATION',
        'bvd': 'BUSINESS_VALIDATION_DONE',
        'cmp': 'LIVE_IN_PRODUCTION'
    };

    private taskData: any[];
    public getStatsEventEmitter = new EventEmitter<boolean>();

    constructor(private http: Http, private envService: EnvService) {}

    getTask(taskId) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/taskbyid?taskId=' + taskId); 
    }
    
    getAvailableTasks(userData) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/availabletasks/data?username=' + userData.username);            
    }
    
    getMyBinTasks(userData) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/mybintasks/data?username=' + userData.username);  
    }

    getAssignedTasks() {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/assignedtasks');  
    }

    getCompletedTasks() {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/completedtasks'); 
    }
    
    getTaskDetails(taskId) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/taskDetails/data?taskId=' + taskId);
    }

    getStats() {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/stats');
    }

    refreshStats(e) {
        this.getStatsEventEmitter.emit(e);
    }

    getTaskNotes(taskId) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.get(url + '/ReleaseDeployment/rest/tasks/notes/data?taskId=' + taskId);
    }

    addTaskNote(taskId, note, username, datetime) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        return this.http.post(url + '/ReleaseDeployment/rest/tasks/addnote', {
            taskId,
            note,
            username,
            datetime
        });
    }

    updateTask(id, taskData) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        const url = (HOST && PORT) ? 'http://' + HOST + ':' + PORT : '';
        const payload = Object.assign({}, taskData, { taskId: +id });
        return this.http.post(url + '/ReleaseDeployment/rest/tasks/updatetask', payload);
    }

    fromSTATUSTostatus(STATUS) {
        return this.STATUS_status[STATUS];
    }

    fromstatusToSTATUS(status) {
        return this.status_STATUS[status];
    }

    // ********************************************************************************************************************************************

    availableCriteria = {
        'dev': ['new'],
        'ops': ['ops'],
        'int': ['int'],
        'ext': ['ext']
    }

    updateTasks(taskData) {
        // this.taskData = taskData;
        // console.log(this.taskData);
    }

    createTask() {
        // 
    }
    
    getTasks(statuses, filterCriteria, page) {
        if(filterCriteria) {
            return this.taskData.filter((task) => {
                return (statuses.includes(task.status) && task[filterCriteria.field] === filterCriteria.value);
            });
        }
        return this.taskData.filter((task) => {
            return statuses.includes(task.status);
        });
    }

    getAvailableTasks_(userData) {
        const securityGroup = userData['securityGroup'];
        return this.getTasks(this.availableCriteria[securityGroup], null, 'available');
    }

    getMyBinTasks_(userData) {
        const owner = userData['owner'];
        const fc = owner ? { 'field': 'owner', 'value': owner } : null;
        return this.getTasks(['asg'], fc, 'mybin');
    }

    getAssignedTasks_(userData) {
        const owner = userData['owner'];
        const fc = owner ? { 'field': 'owner', 'value': owner } : null;
        return this.getTasks(['asg'], fc, 'assigned');
    }

    getCompletedTasks_() {
        return this.getTasks(['bvd', 'cmp', 'lip'], null, 'completed');
    }

    updateTask_(id, taskData) {
        const index = this.taskData.findIndex(task => task.id === id)
        this.taskData[index] = Object.assign(this.taskData[index], taskData);
        console.log(this.taskData);
    }
  
    /* private taskData: any[] = [{
        'taskId': '0',
        'processId': '0',
        'processName': 'Task 0',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '3',
        'severityName': 'Critical'
    }, {
        'taskId': '1',
        'processId': '1',
        'processName': 'Task 1',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '2',
        'severityName': 'High'
    }, {
        'taskId': '2',
        'processId': '2',
        'processName': 'Task 2',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '1',
        'severityName': 'Medium'
    }, {
        'taskId': '3',
        'processId': '3',
        'processName': 'Task 3',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '0',
        'severityName': 'Low'
    }, {
        'taskId': '4',
        'processId': '4',
        'processName': 'Task 4',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '3',
        'severityName': 'Critical'
    }, {
        'taskId': '5',
        'processId': '5',
        'processName': 'Task 5',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '3',
        'severityName': 'Critical'
    }, {
        'taskId': '6',
        'processId': '6',
        'processName': 'Task 6',
        'opsStep': 'false',
        'status': 'new',
        'ownerId': '',
        'owner': '',
        'dev': '',
        'inv': '',
        'exv': '',
        'ops': '',
        'query': 'for the nested table',
        'severity': '3',
        'severityName': 'Critical'
    }]; */


}
