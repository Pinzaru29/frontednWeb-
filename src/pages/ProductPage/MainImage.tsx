interface MainImageProps {
    source: string
}

const MainImage = (props: MainImageProps) => {
    return (
        <div>
            <img src={props.source} height="auto" width="100%" max-width='450px' alt=""/>
        </div>
    )
}

export {MainImage}