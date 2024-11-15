package hcmut.hcmut_spss.Services.RestfulAPI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import hcmut.hcmut_spss.DTO.UtilityDTO;

@Service
public class PrinterService {
    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public PrinterService(JdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
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

    public ResponseEntity<ResponseObject> PROC_addPrinter(PrinterDTO printerDTO){
        try {
            jdbcTemplate.execute(
            "CALL Add_printer(?, ?, ?, ?, ?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setString(1, printerDTO.getBrand_name());
                ps.setString(2, printerDTO.getPrinter_model());
                ps.setString(3, printerDTO.getDescription());
                ps.setString(4, printerDTO.getCampus());
                ps.setString(5, printerDTO.getBuilding());
                ps.setString(6, printerDTO.getRoom());
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_addPrinter() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_addPrinter(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_enablePrinter(Integer printerId){
        try {
            jdbcTemplate.execute(
            "CALL Enable_printer(?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setInt(1, printerId);
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_enablePrinter() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_enablePrinter(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_disablePrinter(Integer printerId){
        try {
            jdbcTemplate.execute(
            "CALL Disable_printer(?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setInt(1, printerId);
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_disablePrinter() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_disablePrinter(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> PROC_updatePrinterInfor(Integer printerId, PrinterDTO printerDTO){
        try {
            jdbcTemplate.execute(
            "CALL update_printer_infor(?, ?, ?, ?, ?, ?, ?)",
            (PreparedStatementCallback<Void>) ps -> {
                ps.setInt(1, printerId);
                ps.setString(2, printerDTO.getBrand_name());
                ps.setString(3, printerDTO.getPrinter_model());
                ps.setString(4, printerDTO.getDescription());
                ps.setString(5, printerDTO.getCampus());
                ps.setString(6, printerDTO.getBuilding());
                ps.setString(7, printerDTO.getRoom());
                ps.execute();
                return null;
            }
        );
            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to update PROC_updatePrinterInfor() successfully", null));
        } catch (DataAccessException e) {
            // Xử lý lỗi liên quan đến truy cập dữ liệu
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Database error: " + e.getMessage(), null));
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseObject("ERROR", "Error updating PROC_updatePrinterInfor(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> FNC_getPrinterInforById(Integer printerId){
        try {
            String printerInfor = jdbcTemplate.queryForObject(
                "SELECT get_printer_infor_by_id(?)",
                String.class, 
                printerId
            );

            JsonNode jsonNode = objectMapper.readTree(printerInfor);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get FNC_getPrinterInforById() successfully", jsonNode));
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
                .body(new ResponseObject("ERROR", "Error getting FNC_getPrinterInforById(): " + e.getMessage(), null));
        }
    }

    public ResponseEntity<ResponseObject> FNC_getInforAllPrinter(){
        try {
            String printerInforList = jdbcTemplate.queryForObject(
                "SELECT get_infor_all_printer()",
                String.class
            );

            JsonNode jsonNode = objectMapper.readTree(printerInforList);

            return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("OK", "Query to get FNC_getInforAllPrinter() successfully", jsonNode));
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
                .body(new ResponseObject("ERROR", "Error getting FNC_getInforAllPrinter(): " + e.getMessage(), null));
        }
    }
}
