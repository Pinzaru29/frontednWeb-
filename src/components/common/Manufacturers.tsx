import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Box} from "@mui/system";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../api/axios";

interface ManufacturersProps {
    manufacturer: string,
    setManufacturer: React.Dispatch<React.SetStateAction<string>>
}


const Manufacturers = (props: ManufacturersProps) => {

    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        axiosInstance.get('/product/manufacturers').then((res) => {
            setManufacturers(res.data);
        })
    }, [])

    return (
        <Box padding="10px">
            <FormControl fullWidth>
                <InputLabel>Manufacturer</InputLabel>
                <Select
                    value={props.manufacturer}
                    label="Manufacturer"
                    onChange={(event: SelectChangeEvent) => {
                        props.setManufacturer(event.target.value)
                    }}
                >
                    <MenuItem value={""}>Nothing</MenuItem>
                    {manufacturers.map((item, i) =>
                        <MenuItem key={i} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}
export {Manufacturers}