package hcmut.hcmut_spss.DTO;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PrintingRowMapper implements RowMapper<PrintingDTO> {
    @Override
    public PrintingDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        PrintingDTO printingDTO = new PrintingDTO();
        printingDTO.setUsername(rs.getString("username"));
        printingDTO.setPrinter_id(rs.getInt("printer_id"));
        return printingDTO;
    }
}
