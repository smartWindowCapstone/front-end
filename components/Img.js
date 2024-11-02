
const img=[
    "sunny.jpeg","rain.jpeg","rain.jpeg","snow.jpeg","rain.jpeg","snow.jpeg"
]

export default function Img({rainType}){
return(
    <div style={{position:"absolute",display:"inline",left:"8rem" ,zIndex:5}}> 
    <img src={`image/${img[rainType]}`} alt={"img"}/>
    </div>
);

}
        // 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)