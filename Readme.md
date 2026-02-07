# 🎓 University Assignment Portal

A full-stack, role-based web application designed to manage academic assignment workflows in a university environment. The system supports **students, professors, and Heads of Department (HODs)** with controlled access, multi-level approvals, and centralized academic data management.

---

## 📌 Overview

The University Assignment Portal streamlines the assignment submission, evaluation, and approval process by introducing **role-based access control** and **enterprise-style workflows**. It eliminates manual handling of assignments and provides a structured, transparent system for academic operations.

---

## ✨ Key Features

- Role-based access for **Students, Professors, and HODs**
- Secure authentication and authorization
- Assignment submission and tracking system
- Multi-step approval workflow (Professor → HOD)
- Centralized management of submissions, grades, and feedback
- Scalable architecture following real-world enterprise practices
- Clean and responsive user interface

---

## 🏗️ System Architecture

### Roles & Responsibilities

**Student**
- Submit assignments
- View submission status and feedback
- Track grades

**Professor**
- Review and evaluate student submissions
- Provide grades and feedback
- Forward assignments for HOD approval

**HOD**
- Final approval or rejection of evaluated assignments
- Monitor academic workflows and records

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 🧩 Core Concepts Implemented

- Role-Based Access Control (RBAC)
- RESTful API architecture
- Multi-step approval workflows
- Centralized database schema design
- Secure client–server communication
- Modular and scalable backend structure

---

## 🗄️ Database Design

- **Users Collection**  
  Stores role-based user information (Student, Professor, HOD)

- **Assignments Collection**  
  Stores assignment details and submission metadata

- **Submissions Collection**  
  Tracks student submissions, grades, feedback, and approval status

---

## 🎯 Learning Outcomes

- Designing enterprise-level academic systems
- Implementing RBAC in full-stack applications
- Structuring scalable MongoDB schemas
- Building real-world approval workflows
- Developing secure and maintainable MERN applications
