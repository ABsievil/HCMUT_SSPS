package hcmut.hcmut_spss.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import hcmut.hcmut_spss.DTO.LoginDTO;
import hcmut.hcmut_spss.DTO.ResponseObject;

@Service
public class UserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Tìm tất cả Nhân viên y tế
    public ResponseEntity<ResponseObject> BasicTemplate() {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "", null));

        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "", null));
        }
    }

    public ResponseEntity<ResponseObject> Login(LoginDTO loginDTO) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "Accepted Login", null));

        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "Failed to Login", null));
        }
    }
}
