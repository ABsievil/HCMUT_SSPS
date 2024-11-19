package hcmut.hcmut_spss.Controllers.RestfulAPI;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.RestfulAPI.ChangePasswordDTO;
import hcmut.hcmut_spss.DTO.RestfulAPI.LogStudentDTO;
import hcmut.hcmut_spss.DTO.RestfulAPI.PrintDTO;
import hcmut.hcmut_spss.DTO.RestfulAPI.PurchasePageDTO;
import hcmut.hcmut_spss.DTO.RestfulAPI.StudentDTO;
import hcmut.hcmut_spss.DTO.RestfulAPI.UpdateStudentDTO;
import hcmut.hcmut_spss.Services.RestfulAPI.StudentService;

@RestController
@RequestMapping("/api/v1/Student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/getStudentIdByUsername")
    public ResponseEntity<ResponseObject> FNC_getStudentIdByUsername(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        return studentService.FNC_getStudentIdByUsername(username);
    }

    @GetMapping("/getStudentInforById/{studentId}")
    public ResponseEntity<ResponseObject> getStudentInforById(@PathVariable String studentId) {
        return studentService.FNC_getStudentInforById(studentId);
    }

    @GetMapping("/getAllStudentInfor")
    public ResponseEntity<ResponseObject> getAllStudentInfor() {
        return studentService.FNC_getAllStudentInfor();
    }

    @PutMapping("/addStudent")
    public ResponseEntity<ResponseObject> addStudent(@RequestBody StudentDTO studentDTO){
        return studentService.PROC_addStudent(studentDTO);
    }

    @PutMapping("/deleteStudent/{studentId}")
    public ResponseEntity<ResponseObject> deleteStudent(@PathVariable String studentId){
        return studentService.PROC_deleteStudent(studentId);
    }

    @PutMapping("/updateStudent")
    public ResponseEntity<ResponseObject> updateStudent(@RequestBody UpdateStudentDTO updateStudentDTO){
        return studentService.PROC_updateStudent(updateStudentDTO);
    }

    @PutMapping("/changeStudentPassword")
    public ResponseEntity<ResponseObject> changeStudentPassword(@RequestBody ChangePasswordDTO changePasswordDTO){
        return studentService.PROC_changeStudentPassword(changePasswordDTO);
    }
    
    @GetMapping("/getNumberPageDefaultRemain/{studentId}")
    public ResponseEntity<ResponseObject> getNumberPageDefaultRemain(@PathVariable String studentId) {
        return studentService.FNC_getNumberPageDefaultRemain(studentId);
    }

    @GetMapping("/getNumberPageWasPrinted/{studentId}")
    public ResponseEntity<ResponseObject> getNumberPageWasPrinted(
        @PathVariable String studentId,
        @RequestParam(value = "dateStart", required = false) String dateStart,
        @RequestParam(value = "dateEnd", required = false) String dateEnd) {

        dateStart = (dateStart != null && !dateStart.isEmpty()) ? dateStart: null;
        dateEnd = (dateEnd != null && !dateEnd.isEmpty()) ? dateEnd: null;
        return studentService.FNC_getNumberPageWasPrinted(studentId, dateStart, dateEnd);
    }

    @GetMapping("/getLogStudent/{studentId}")
    public ResponseEntity<ResponseObject> getLogStudent(
        @PathVariable String studentId, 
        @RequestBody LogStudentDTO logStudentDTO) {

        return studentService.FNC_getLogStudent(studentId, logStudentDTO);
    }

    @GetMapping("/getLogAllStudent")
    public ResponseEntity<ResponseObject> getLogAllStudent(@RequestBody LogStudentDTO logStudentDTO) {
        return studentService.FNC_getLogAllStudent(logStudentDTO);
    }

    @PutMapping("/print")
    public ResponseEntity<ResponseObject> print(@RequestBody PrintDTO printDTO){
        return studentService.PROC_print(printDTO);
    }

    @PutMapping("/purchasePage")
    public ResponseEntity<ResponseObject> purchasePage(@RequestBody PurchasePageDTO purchasePageDTO){
        return studentService.PROC_purchasePage(purchasePageDTO);
    }

    @GetMapping("/getLogBuyPageStudent/{studentId}")
    public ResponseEntity<ResponseObject> getLogBuyPageStudent(
        @PathVariable String studentId, 
        @RequestParam(value = "dateStart", required = false) String dateStart,
        @RequestParam(value = "dateEnd", required = false) String dateEnd) {

        dateStart = (dateStart != null && !dateStart.isEmpty()) ? dateStart: null;
        dateEnd = (dateEnd != null && !dateEnd.isEmpty()) ? dateEnd: null;
        return studentService.FNC_getLogBuyPageStudent(studentId, dateStart, dateEnd);
    }

    @GetMapping("/getLogBuyPageAllStudent")
    public ResponseEntity<ResponseObject> getLogBuyPageAllStudent(
        @RequestParam(value = "dateStart", required = false) String dateStart,
        @RequestParam(value = "dateEnd", required = false) String dateEnd) {

        dateStart = (dateStart != null && !dateStart.isEmpty()) ? dateStart: null;
        dateEnd = (dateEnd != null && !dateEnd.isEmpty()) ? dateEnd: null;
        return studentService.FNC_getLogBuyPageAllStudent(dateStart, dateEnd);
    }
}
