package hcmut.hcmut_spss.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hcmut.hcmut_spss.DTO.LoginDTO;
import hcmut.hcmut_spss.DTO.ResponseObject;
import hcmut.hcmut_spss.Services.UserService;

@RestController
@RequestMapping("/api/v1/User")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody LoginDTO request) {
        return  userService.Login(request);
    }

    // @GetMapping("/oauth2/github")
    // public String userinfo(@AuthenticationPrincipal OAuth2User user) {
    //     return "Hello user: " + user.getAttribute("username") + " - " + user.getAttribute("email");
    // }
}
