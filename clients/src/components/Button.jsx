

export default function Button({name, type = "button", variant = "primary", size = 44, fullWidth, onClick}) {
    return (
        <button className={`bg-${variant} hover:bg-${variant}-hover font-bold py-2 px-4 my-4 rounded-lg text-page ${fullWidth ? 'w-full' : ''} h-${size}px`} type={type} onClick={onClick}>
            {name}
        </button>
    );
}