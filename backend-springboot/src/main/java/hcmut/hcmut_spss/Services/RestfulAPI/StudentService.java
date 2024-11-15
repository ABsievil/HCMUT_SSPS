package hcmut.hcmut_spss.Services.RestfulAPI;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import hcmut.hcmut_spss.DTO.PrinterDTO;
import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.StudentDTO;

@Service
public class StudentService {
    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public StudentService(JdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
    }

    public ResponseEntity<ResponseObject> FNC_getStudentInforById(String studentId){
        try {
            String studentInfor = jdbcTemplate.queryForObject(
                "SELECT get_student_infor_by_id(?)",
                String.class, 
                studentId
            );

            JsonNode jsonNode = objectMapper.readTree(studentInfor);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get FNC_getStudentInforById() successfully", jsonNode));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (JsonProcessingException e) {
            // Xử lý lỗi khi parse JSON
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "JSON processing error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error getting FNC_getStudentInforById(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> FNC_getAllStudentInfor(){
        try {
            String studentInforList = jdbcTemplate.queryForObject(
                "SELECT get_all_student_infor()",
                String.class
            );

            JsonNode jsonNode = objectMapper.readTree(studentInforList);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get FNC_getAllStudentInfor() successfully", jsonNode));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (JsonProcessingException e) {
            // Xử lý lỗi khi parse JSON
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "JSON processing error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error getting FNC_getAllStudentInfor(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_addStudent(StudentDTO studentDTO){
        try {
            jdbcTemplate.execute(
            "CALL add_student(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setString(1, studentDTO.getUsername());
                ps.setString(2, studentDTO.getPassword());
                ps.setString(3, studentDTO.getLast_name());
                ps.setString(4, studentDTO.getMiddle_name());
                ps.setString(5, studentDTO.getFirst_name());
                ps.setString(6, studentDTO.getEmail());
                ps.setDate(7, studentDTO.getDate_of_birth());
                ps.setString(8, studentDTO.getPhone_number());
                ps.setString(9, studentDTO.getRole());
                ps.setString(10, studentDTO.getStudent_id());
                ps.setString(11, studentDTO.getSchool_year());
                ps.setString(12, studentDTO.getFaculty());
                ps.setInt(13, studentDTO.getPage_remain());

                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_addStudent() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_addStudent(): " + e.getMessage(), null));
        }
    }

    // public ResponseEntity<ResponseObject> FNC_getLogStudent(String studentId){
    //     try {
    //         String logStudentList = jdbcTemplate.queryForObject(
    //             "select log_a_student_json(?)",
    //             String.class, studentId
    //         );

    //         JsonNode jsonNode = objectMapper.readTree(logStudentList);

    //         return ResponseEntity.status(HttpStatus.OK)
    //             .body(new ResponseObject("OK", "Query to get getLogStudent() successfully", jsonNode));
    //     } catch (DataAccessException e) {
    //         // Xử lý lỗi liên quan đến truy cập dữ liệu
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
    //     } catch (JsonProcessingException e) {
    //         // Xử lý lỗi khi parse JSON
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(new ResponseObject("ERROR", "JSON processing error: " + e.getMessage(), null));
    //     } catch (Exception e) {
    //         // Xử lý các lỗi khác
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(new ResponseObject("ERROR", "Error getting getLogStudent(): " + e.getMessage(), null));
    //     }
    // }

    // public ResponseEntity<ResponseObject> FNC_getLogAllStudent(){
    //     try {
    //         String logAllStudentList = jdbcTemplate.queryForObject(
    //             "select log_all_student_json()",
    //             String.class
    //         );

    //         JsonNode jsonNode = objectMapper.readTree(logAllStudentList);

    //         return ResponseEntity.status(HttpStatus.OK)
    //             .body(new ResponseObject("OK", "Query to get getLogAllStudent() successfully", jsonNode));
    //     } catch (DataAccessException e) {
    //         // Xử lý lỗi liên quan đến truy cập dữ liệu
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
    //     } catch (JsonProcessingException e) {
    //         // Xử lý lỗi khi parse JSON
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(new ResponseObject("ERROR", "JSON processing error: " + e.getMessage(), null));
    //     } catch (Exception e) {
    //         // Xử lý các lỗi khác
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .body(new ResponseObject("ERROR", "Error getting getLogAllStudent(): " + e.getMessage(), null));
    //     }
    // }
}
