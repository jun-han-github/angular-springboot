import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  title = 'Data structures';
  credit = 6;

  tests = [
    {
      question: 'A company has many VPC in various accounts, that need to be connected in a star network with one another and connected with on-premises networks through Direct Connect. What do you recommend?',
      answer: 'Transit Gateway'
    },
    {
      question: 'You would like to store a database password in a secure place, and enable automatic rotation of that password every 90 days. What do you recommend?',
      answer: 'Secrets Manager'
    },
    {
      question: 'Upon a security review of your AWS account, an AWS consultant has found that a few RDS databases are un-encrypted. As a Solutions Architect, what steps must be taken to encrypt the RDS databases?',
      answer: 'Take a snapshot of the database, copy it as an encrypted snapshot, and restore a database from the encrypted snapshot. Terminate the previous database'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  save(question: string, answer: string) {
    console.log('Question: ', question, 'Answer: ', answer);
  }

}
