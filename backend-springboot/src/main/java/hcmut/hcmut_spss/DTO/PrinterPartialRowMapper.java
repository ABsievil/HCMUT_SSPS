package hcmut.hcmut_spss.DTO;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
public class PrinterPartialRowMapper implements RowMapper<PrinterDTO> {
    @Override
    public PrinterDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        PrinterDTO printerDTO = new PrinterDTO();
        printerDTO.setPrinter_id(rs.getInt("printer_id"));
        printerDTO.setBranch_name(rs.getString("branch_name"));
        printerDTO.setPrinter_model(rs.getString("printer_model"));
        printerDTO.setDescription(null);
        printerDTO.setCampus(rs.getString("campus"));
        printerDTO.setBuilding(rs.getString("building"));
        printerDTO.setRoom(rs.getString("room"));
        printerDTO.setState(null);
        return printerDTO;
    }
}


