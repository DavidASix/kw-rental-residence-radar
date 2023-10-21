import s from "./loader.module.css"

const Loader = ({className, style, color, size, center}) => {
    const sz = size ? {height: size, width: size, borderWidth: size/5 } : {};
    const c = color ? {borderTopColor: color} : {}
    const cen = center ? {position: 'absolute', top: '50%', bottom: '50%', left: '50%', right: '50%'} : {};
    const st = style ? style : {};

    return (
    <div 
        className={`${s.loader} ${className}`} 
        style={{...st, ...cen, ...sz, ...c}} />
)};

export default Loader;