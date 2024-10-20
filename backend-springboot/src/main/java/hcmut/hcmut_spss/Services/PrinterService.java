package hcmut.hcmut_spss.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import hcmut.hcmut_spss.DTO.PrinterDTO;
import hcmut.hcmut_spss.DTO.PrinterPartialRowMapper;
import hcmut.hcmut_spss.DTO.PrinterRowMapper;
import hcmut.hcmut_spss.DTO.ResponseObject;

@Service
public class PrinterService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ResponseEntity<ResponseObject> FNC_getPrinter_information(){
        try {
            List<PrinterDTO> printerInforList = jdbcTemplate.query(
            "SELECT printer_id, branch_name, printer_model, description, campus, building, room, state FROM Printer_information()", new PrinterRowMapper());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "Query to get Printer_information() successfully", printerInforList));
        } catch(DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "Error getting Printer_information()", null));
        }
    }

    public ResponseEntity<ResponseObject> FNC_getPatialPrinter_information(){
        try {
            List<PrinterDTO> printerInforList = jdbcTemplate.query(
            "SELECT printer_id, branch_name, printer_model, campus, building, room FROM Printer_information()", new PrinterPartialRowMapper());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "Query to get Patial Printer_information() successfully", printerInforList));
        } catch(DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "Error getting Patial Printer_information()", null));
        }
    }
}
