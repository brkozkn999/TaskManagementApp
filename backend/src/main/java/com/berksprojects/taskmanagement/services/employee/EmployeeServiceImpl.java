package com.berksprojects.taskmanagement.services.employee;

import com.berksprojects.taskmanagement.dto.TaskDto;
import com.berksprojects.taskmanagement.entities.User;
import com.berksprojects.taskmanagement.enums.TaskStatus;
import com.berksprojects.taskmanagement.repositories.TaskRepository;
import com.berksprojects.taskmanagement.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.berksprojects.taskmanagement.entities.Task;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public List<TaskDto> getEmployeeTasksById(Long userId) {
        // Kullanıcının id'sine göre atanmış görevleri getir
        List<Task> tasks = taskRepository.findByUserId(userId);
        // Görevleri TaskDto'ya dönüştür ve döndür
        return tasks.stream()
                .map(Task::getTaskDto)
                .collect(Collectors.toList());
    }

    @Override
    public Long getCurrentEmployeeId() {
        // Spring Security ile kimlik doğrulaması yapılabilir, şu an için basit bir örnek kullanıyoruz.
        // Örneğin, güvenliği sağlamak için JWT veya Spring Security'nin yeteneklerini kullanabilirsiniz.

        // Şu an için örneğin, mevcut kullanıcıyı bulalım.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> optionalUser = userRepository.findFirstByEmail(email);

        // Eğer kullanıcı varsa, onun ID'sini döndür, yoksa null.
        return optionalUser.map(User::getId).orElse(null);
    }

    @Override
    public TaskDto updateTaskStatus(Long id, TaskStatus newStatus) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTaskStatus(newStatus);
            return taskRepository.save(existingTask).getTaskDto();
        }
        return null;
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
    @Override
    public TaskDto getTaskById(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        return optionalTask.map(Task::getTaskDto).orElse(null);
    }
}