package hcmut.hcmut_spss.Models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    // @Embedded
    // private PersonalInformation information;

    @Id
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false, unique = false)
    private String password;

    @Column(name = "email", nullable = false, unique = false)
    private String email;

    @Column(name= "last_name")
    private String last_name;

    @Column(name= "middle_name")
    private String middle_name;

    @Column(name= "first_name")
    private String first_name;

    @Column(name= "date_of_birth")
    private Date date;

    @Column(name= "phone_number")
    private String phone_number;

    @Column(name= "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name= "student_id")
    private String student_id;

    @Column(name= "school_year")
    private String school_year;

    @Column(name= "faculty")
    private String faculty;

    @Column(name= "page_remain")
    private Integer page_remain;

}
