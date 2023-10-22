import s from "./radarScanner.module.css"

const RadarScanner = ({color, size, style, className}) => {
    const sz = size ? {height: size, width: size} : {};
    const scanStyle = color ? {background: `conic-gradient(${color}90, ${color})`} : {};
    const st = style || {};
    return (
        <div className={`${s.outerCircle} ${className}`} style={{...st, ...sz}}>
            <div className={s.scanner} style={scanStyle}/>
            <div className={s.lineContainer}>
                <div className={s.circleSmall} />
                <div className={s.circleMedium} />
                <div className={s.circleLarge} />
                <div className={s.verticalLine} />
                <div className={s.horizontalLine} />
            </div>
        </div>
)};

export default RadarScanner;