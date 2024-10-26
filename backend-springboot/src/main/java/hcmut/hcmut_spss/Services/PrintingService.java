package hcmut.hcmut_spss.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import hcmut.hcmut_spss.DTO.PrinterDTO;
import hcmut.hcmut_spss.DTO.PrinterRowMapper;
import hcmut.hcmut_spss.DTO.PrintingDTO;
import hcmut.hcmut_spss.DTO.PrintingRowMapper;
import hcmut.hcmut_spss.DTO.ResponseObject;

@Service
public class PrintingService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ResponseEntity<ResponseObject> getPrinting_information(){
        try {
            List<PrintingDTO> printingInforList = jdbcTemplate.query(
            "SELECT * FROM printing", new PrintingRowMapper());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("OK", "Query to get Printing_information() successfully", printingInforList));
        } catch(DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "Error getting Printing_information()", null));
        }
    }
}
