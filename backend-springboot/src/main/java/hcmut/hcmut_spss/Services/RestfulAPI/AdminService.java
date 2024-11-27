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

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.RestfulAPI.UpdateAdminDTO;
import hcmut.hcmut_spss.DTO.RestfulAPI.UpdateStudentDTO;

@Service
public class AdminService {
    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public AdminService(JdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
    }

    public ResponseEntity<ResponseObject> FNC_getAdminInfor(){
        try {
            String adminInfor = jdbcTemplate.queryForObject(
                "SELECT get_admin_infor()",
                String.class
            );
            if (adminInfor == null) {
                return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "Query to get FNC_getAdminInfor() successfully with data = null", adminInfor));
            }

            JsonNode jsonNode = objectMapper.readTree(adminInfor);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get FNC_getAdminInfor() successfully", jsonNode));
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
                .body(new ResponseObject("ERROR", "Error getting FNC_getAdminInfor(): " + e.getMessage(), null));
        }
    }    

    public ResponseEntity<ResponseObject> PROC_updateAdminInfor(UpdateAdminDTO updateAdminDTO){
        try {
            jdbcTemplate.execute(
            "CALL update_admin_infor(?, ?, ?, ?, ?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setString(1, updateAdminDTO.getLast_name());
                ps.setString(2, updateAdminDTO.getMiddle_name());
                ps.setString(3, updateAdminDTO.getFirst_name());
                ps.setString(4, updateAdminDTO.getEmail());
                ps.setDate(5, updateAdminDTO.getDate_of_birth());
                ps.setString(6, updateAdminDTO.getPhone_number());

                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_updateAdminInfor() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_updateAdminInfor(): " + e.getMessage(), null));
        }
    }

}
