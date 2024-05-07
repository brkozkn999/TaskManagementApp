package com.berksprojects.taskmanagement.controller.employee;

import com.berksprojects.taskmanagement.dto.AuthenticationResponse;
import com.berksprojects.taskmanagement.dto.TaskDto;
import com.berksprojects.taskmanagement.entities.User;
import com.berksprojects.taskmanagement.enums.TaskStatus;
import com.berksprojects.taskmanagement.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.berksprojects.taskmanagement.services.employee.EmployeeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:4200" )
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping("/tasks")
    public ResponseEntity<?> getEmployeeTasks() {
        // Kullanıcının email adresine göre atanmış görevleri getir
        List<TaskDto> employeeTasks = employeeService.getEmployeeTasksById(employeeService.getCurrentEmployeeId());

        if (employeeTasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No tasks assigned to the employee");
        }

        return ResponseEntity.ok(employeeTasks);
    }

    private TaskStatus mapStringToTaskStatus(String status) {
        return switch (status) {
            case "PENDING" -> TaskStatus.PENDING;
            case "INPROGRESS" -> TaskStatus.INPROGRESS;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            default -> TaskStatus.CANCELLED;
        };
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskDto> updateTaskStatus(@PathVariable Long id, @RequestBody String newStatus) {
        TaskDto updatedTaskDto = employeeService.updateTaskStatus(id, mapStringToTaskStatus(newStatus));
        if (updatedTaskDto == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(updatedTaskDto);
    }
}