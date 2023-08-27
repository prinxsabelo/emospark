import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private dataSubject: Subject<string> = new Subject<string>();

  public baseUrl: string = environment.baseUrl;

  constructor(public http: HttpClient, public router: Router) {}

  sendData(data: string) {
    this.dataSubject.next(data);
  }

  getData(): Observable<string> {
    return this.dataSubject.asObservable();
  }

  private getUserType(): string | null {
    return sessionStorage.getItem('user_type')?.toLowerCase() || null;
  }

  private buildUrlWithUserType(path: string): any {
    const user_type = this.getUserType();
    if (user_type) {
      return `${this.baseUrl}${user_type}/${path}`;
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user_type');

      if (this.router.url != '/forgot-password') {
        this.router.navigate(['login']);
      }
    }
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  // Branch Methods

  addBranch(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-branch'), data);
  }

  getBranches() {
    return this.http.get<any>(this.buildUrlWithUserType('get-branches'));
  }

  editBranch(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-branch'), data);
  }

  deleteBranch(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-branch'),
      data
    );
  }

  // Department Methods

  addDepartment(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('add-department'),
      data
    );
  }

  getDepartments() {
    return this.http.get<any>(this.buildUrlWithUserType('get-departments'));
  }

  editDepartment(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-department'),
      data
    );
  }

  deleteDepartment(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-department'),
      data
    );
  }

  getBranchDepartments() {
    return this.http.get<any>(
      this.buildUrlWithUserType('get-branch-departments')
    );
  }

  // Designation Methods

  addDesignation(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('add-designation'),
      data
    );
  }

  getDesignations() {
    return this.http.get<any>(this.buildUrlWithUserType('get-designations'));
  }

  editDesignation(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-designation'),
      data
    );
  }

  deleteDesignation(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-designation'),
      data
    );
  }

  getBranchDepartmentDesignations() {
    return this.http.get<any>(
      this.buildUrlWithUserType('get-branch-department-designations')
    );
  }

  // Grade Level Methods

  addGradeLevel(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('add-grade-level'),
      data
    );
  }

  editGradeLevel(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-grade-level'),
      data
    );
  }

  deleteGradeLevel(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-grade-level'),
      data
    );
  }

  getGradeLevels() {
    return this.http.get<any>(this.buildUrlWithUserType('get-grade-levels'));
  }

  // Employee Methods

  addEmployee(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-employee'), data);
  }

  uploadEmployeePassport(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('upload-passport'),
      data
    );
  }

  uploadEmployeeResume(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('upload-resume'),
      data
    );
  }

  getEmployee(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('get-employee'), data);
  }

  editEmployee(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-employee'),
      data
    );
  }

  actionEmployee(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('action-employee'),
      data
    );
  }

  deleteEmployee(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-employee'),
      data
    );
  }

  getEmployees() {
    return this.http.get<any>(this.buildUrlWithUserType('get-employees'));
  }

  getEmployeesForLineManager() {
    return this.http.get<any>(
      this.buildUrlWithUserType('get-employees-for-line-manager')
    );
  }

  // HR User Methods

  addUserHR(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-user-hr'), data);
  }

  getUsersHR() {
    return this.http.get<any>(this.buildUrlWithUserType('get-users-hr'));
  }

  editUserHR(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-user-hr'), data);
  }

  deleteUserHR(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-user-hr'),
      data
    );
  }

  actionUserHR(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('action-user-hr'),
      data
    );
  }

  // Leave Type Methods

  addLeaveType(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('add-leave-type'),
      data
    );
  }

  editLeaveType(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-leave-type'),
      data
    );
  }

  deleteLeaveType(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-leave-type'),
      data
    );
  }

  getLeaveTypes() {
    return this.http.get<any>(this.buildUrlWithUserType('get-leave-types'));
  }

  // Leave Calendar Methods

  addLeaveCalendar(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('add-leave-calendar'),
      data
    );
  }

  getLeaveCalendars() {
    return this.http.get<any>(this.buildUrlWithUserType('get-leave-calendars'));
  }

  editLeaveCalendar(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-leave-calendar'),
      data
    );
  }

  deleteLeaveCalendar(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-leave-calendar'),
      data
    );
  }

  // Leave Methods

  addLeave(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-leave'), data);
  }

  getLeaves() {
    return this.http.get<any>(this.buildUrlWithUserType('get-leaves'));
  }

  getLeavesForLine() {
    return this.http.get<any>(this.buildUrlWithUserType('get-leaves-for-line'));
  }

  editLeave(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-leave'), data);
  }

  actionLeave(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('action-leave'), data);
  }

  // Other Methods

  checkLine() {
    return this.http.get<any>(this.buildUrlWithUserType('check-line'));
  }

  countPendingApprovals() {
    return this.http.get<any>(
      this.buildUrlWithUserType('count-pending-approvals')
    );
  }

  getLeaveCalendarsForLeave(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('get-leave-calendars-for-leave'),
      data
    );
  }

  getOperatingHours() {
    return this.http.get<any>(this.buildUrlWithUserType('get-operating-hours'));
  }

  // Attendance Methods

  editOperatingHours(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-operating-hours'),
      data
    );
  }

  getAttendanceStatus() {
    return this.http.get<any>(
      this.buildUrlWithUserType('get-attendance-status')
    );
  }

  punchIn(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('punch-in'), data);
  }

  punchOut(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('punch-out'), data);
  }

  getAttendaceLogForDay(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('get-attendance-log-for-day'),
      data
    );
  }

  getAttendaceLog(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('get-attendance-log'),
      data
    );
  }

  // Policy Methods

  addPolicy(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-policy'), data);
  }

  uploadPolicyDocument(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('upload-policy-document'),
      data
    );
  }

  getPolicies() {
    return this.http.get<any>(this.buildUrlWithUserType('get-policies'));
  }

  editPolicy(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-policy'), data);
  }

  deletePolicy(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-policy'),
      data
    );
  }

  // Holiday Methods

  addHoliday(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-holiday'), data);
  }

  getHolidays() {
    return this.http.get<any>(this.buildUrlWithUserType('get-holidays'));
  }

  editHoliday(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-holiday'), data);
  }

  deleteHoliday(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-holiday'),
      data
    );
  }

  // NDA Methods

  addNda(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-nda'), data);
  }

  editNda(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-nda'), data);
  }

  deleteNda(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('delete-nda'), data);
  }

  getNdas() {
    return this.http.get<any>(this.buildUrlWithUserType('get-ndas'));
  }

  getNdaTracker(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('get-nda-tracker'),
      data
    );
  }

  //Job Categories
  getJobCategories() {
    return this.http.get<any>(this.buildUrlWithUserType('get-job-categories'));
  }

  addJobCategory(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('add-job-category'),
      data
    );
  }

  editJobCategory(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('edit-job-category'),
      data
    );
  }

  deleteJobCategory(data: any) {
    return this.http.post<any>(
      this.buildUrlWithUserType('delete-job-category'),
      data
    );
  }

  //Job
  addJob(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('add-job'), data);
  }

  getJob(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('get-job'), data);
  }

  editJob(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('edit-job'), data);
  }

  actionJob(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('action-job'), data);
  }

  getJobs() {
    return this.http.get<any>(this.buildUrlWithUserType('get-jobs'));
  }

  deleteJob(data: any) {
    return this.http.post<any>(this.buildUrlWithUserType('delete-job'), data);
  }

  // ********************************

  getDashboardData() {
    return this.http.get<any>(this.buildUrlWithUserType('get-dashboard-data'));
  }

  // **********************************

  // *********************************************
  runAttendance() {
    return this.http.post<any>(this.buildUrlWithUserType('run-attendance'), {});
  }
}
