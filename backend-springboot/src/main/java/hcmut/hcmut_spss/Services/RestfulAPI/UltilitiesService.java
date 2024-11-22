package hcmut.hcmut_spss.Services.RestfulAPI;

import java.sql.Date;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.RestfulAPI.UtilityDTO;

@Service
public class UltilitiesService {
    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public UltilitiesService(JdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
    }

    public ResponseEntity<ResponseObject> FNC_getFileOfSemester(String semesterId){
        try {
            String fileOfSemesterList = jdbcTemplate.queryForObject(
                "select get_file_of_semester(?)",
                String.class, semesterId
            );
            if (fileOfSemesterList == null) {
                return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "Query to get FNC_getFileOfSemester() successfully with data = null", fileOfSemesterList));
            }

            JsonNode jsonNode = objectMapper.readTree(fileOfSemesterList);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get FNC_getFileOfSemester() successfully", jsonNode));
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
                .body(new ResponseObject("ERROR", "Error getting FNC_getFileOfSemester(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_addFileAccepted(String semester, String typeAccepted){
        try {
            jdbcTemplate.execute(
            "CALL add_file_accepted(?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setString(1, semester); 
                ps.setString(2, typeAccepted);
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_addFileAccepted() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_addFileAccepted(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_deleteFileAccepted(String semester, String typeAccepted){
        try {
            jdbcTemplate.execute(
            "CALL delete_file_accepted(?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setString(1, semester); 
                ps.setString(2, typeAccepted);
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_deleteFileAccepted() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_deleteFileAccepted(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_addUltilityOfSemester(UtilityDTO utilityDTO){
        try {
            //call add_utility('252',100,'2024-12-15',1500)
            // jdbcTemplate.execute("call add_utility(?, ?, ?, ?)", String.class, utilityDTO.getSemesterId(), utilityDTO.getDefaultpage(), utilityDTO.getDateReset(), utilityDTO.getPagePrice());
            
            jdbcTemplate.execute(
            "CALL add_utility_of_semester(?, ?, ?, ?, ?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setString(1, utilityDTO.getSemesterId());
                ps.setInt(2, utilityDTO.getDefaultpage());
                ps.setDate(3, utilityDTO.getDateReset());
                ps.setInt(4, utilityDTO.getPagePrice());
                ps.setDate(5, utilityDTO.getDateStart());
                ps.setDate(6, utilityDTO.getDateEnd());
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_addUtilityOfSemester() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_addUtilityOfSemester(): " + e.getMessage(), null));
        }
    }

}
