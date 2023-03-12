import {Button} from "@mui/material";

interface PageButtonsProps {
    pages: number,
    disabledButton: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const PageButtons = (props: PageButtonsProps) => {

    const arr: number[] = new Array(props.pages).fill(0)

    return (
        <>
            {arr.map((_, index) => <Button variant="text" disabled={props.disabledButton === index} key={index}
                                           sx={{fontSize: "2vh"}} onClick={() => {
                props.setPage(index + 1)
            }}>{index + 1} </Button>)}
        </>
    )
}

export {PageButtons}