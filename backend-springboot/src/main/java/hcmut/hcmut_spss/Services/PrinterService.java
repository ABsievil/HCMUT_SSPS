package hcmut.hcmut_spss.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import hcmut.hcmut_spss.DTO.PrinterDTO;
import hcmut.hcmut_spss.DTO.PrinterPartialRowMapper;
import hcmut.hcmut_spss.DTO.PrinterRowMapper;
import hcmut.hcmut_spss.DTO.ResponseObject;

@Service
public class PrinterService {
    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public PrinterService(JdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
    }

    public ResponseEntity<ResponseObject> FNC_getPrinter_information(){
        try {
            String printerInforList = jdbcTemplate.queryForObject(
                "SELECT get_printer_information_json()",
                String.class
            );

            JsonNode jsonNode = objectMapper.readTree(printerInforList);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get Printer_information() successfully", jsonNode));
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
                .body(new ResponseObject("ERROR", "Error getting Printer_information(): " + e.getMessage(), null));
        }
    }

    // public ResponseEntity<ResponseObject> FNC_getPatialPrinter_information(){
    //     try {
    //         List<PrinterDTO> printerInforList = jdbcTemplate.query(
    //         "SELECT printer_id, branch_name, printer_model, campus, building, room FROM Printer_information()", new PrinterPartialRowMapper());

    //         return ResponseEntity.status(HttpStatus.OK)
    //                 .body(new ResponseObject("OK", "Query to get Patial Printer_information() successfully", printerInforList));
    //     } catch(DataAccessException e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "Error getting Patial Printer_information()", null));
    //     }
    }

    // public ResponseEntity<ResponseObject> FNC_getPrinterInformation() {
    //     try {
    //         List<PrinterDTO> fetchedData = printerRepository.getPrinterInformation();

    //         ObjectMapper mapper = new ObjectMapper();
    //         String jsonData = mapper.writeValueAsString(fetchedData);   // have to handle JsonProcessingException
    //         // JsonNode jsonNode = mapper.valueToTree(fetchedData);     // not handle

    //         return ResponseEntity.status(HttpStatus.OK)
    //                     .body(new ResponseObject("OK", "Query to get Printer_information() successfully", jsonData));
    //     } catch(DataAccessException e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body(new ResponseObject("ERROR" + ", " + e.getMessage().toString(), "Error getting Printer_information()", null));
    //     } catch(JsonProcessingException e) { 
    //         // handle for writeValueAsString method
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body(new ResponseObject("ERROR", "Error converting data to JSON: " + e.getMessage(), null));
    //     }
    // }
}
