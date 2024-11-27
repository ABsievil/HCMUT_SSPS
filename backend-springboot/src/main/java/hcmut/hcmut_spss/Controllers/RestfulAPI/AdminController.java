package hcmut.hcmut_spss.Controllers.RestfulAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.DTO.RestfulAPI.UpdateAdminDTO;
import hcmut.hcmut_spss.Services.RestfulAPI.AdminService;

@RestController
@RequestMapping("/api/v1/Admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    
    @GetMapping("/getAdminInfor")
    public ResponseEntity<ResponseObject> getAdminInfor() {
        return adminService.FNC_getAdminInfor();
    }

    @PutMapping("/updateAdminInfor")
    public ResponseEntity<ResponseObject> updateAdminInfor(@RequestBody UpdateAdminDTO updateAdminInforDTO){
        return adminService.PROC_updateAdminInfor(updateAdminInforDTO);
    }

}
