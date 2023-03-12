import {useEffect, useState} from "react";
import {axiosInstance} from "../../api/axios";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps, Theme} from "@mui/material";
import {Box} from "@mui/system";

interface Category {
    id: number,
    name: string
}

interface CategoriesProps {
    sx?: SxProps<Theme>,
    category: string,
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

const Categories = ({sx = [], category, setCategory}: CategoriesProps) => {

    const [categories, setCategories] = useState<Category[]>([])


    useEffect(() => {
        axiosInstance.get('/category').then((res) => {
            setCategories(res.data);
        })
    }, [])
    return (
        <Box sx={[
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}>
            <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select
                    value={category}
                    label="Platform"
                    onChange={(event: SelectChangeEvent) => {
                        setCategory(event.target.value)
                    }}
                >
                    <MenuItem value={""}>None</MenuItem>
                    {categories.map((item, i) =>
                        <MenuItem key={i} value={item.name}>{item.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}
export {Categories}