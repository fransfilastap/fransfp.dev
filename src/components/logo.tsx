import Link from "next/link";

export default function Logo() {
    return (
        <Link href={'/'}>
            <svg width="45" height="26" viewBox="0 0 45 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.448 0.00699982C15.2133 -0.0489995 15.596 0.231001 15.596 0.847001C15.596 1.16433 15.4933 1.52833 15.288 1.939C15.1013 2.331 14.8867 2.67633 14.644 2.975C14.4013 3.27367 14.168 3.479 13.944 3.591C13.7387 3.68433 13.5053 3.731 13.244 3.731L12.46 3.703C12.1987 3.703 11.9933 3.72167 11.844 3.759C10.9293 3.94567 9.95867 4.18833 8.932 4.487C8.91333 4.487 8.708 4.53367 8.316 4.627C8.24133 4.64567 8.05467 4.69233 7.756 4.767C7.476 4.823 7.224 4.88833 7 4.963C6.79467 5.03767 6.64533 5.131 6.552 5.243C6.36533 5.42967 6.272 5.719 6.272 6.111C6.272 6.48433 6.34667 6.93233 6.496 7.455C6.664 7.959 6.75733 8.25767 6.776 8.351C6.98133 8.92967 7.09333 9.34033 7.112 9.583C7.85867 9.32167 8.74533 9.06033 9.772 8.799C10.7987 8.519 11.704 8.379 12.488 8.379C13.5893 8.379 14.14 8.70567 14.14 9.359C14.14 9.65767 14.0187 10.0403 13.776 10.507C13.5147 10.955 13.2067 11.291 12.852 11.515C12.4973 11.739 12.1333 11.8883 11.76 11.963C11.3867 12.019 10.8827 12.075 10.248 12.131C10.136 12.131 9.968 12.1403 9.744 12.159C9.53867 12.1777 9.36133 12.1963 9.212 12.215C9.11867 12.2337 8.91333 12.2617 8.596 12.299C8.27867 12.3177 8.008 12.3737 7.784 12.467C7.504 12.579 7.32667 12.663 7.252 12.719C7.196 12.7563 7.168 12.8403 7.168 12.971C7.168 13.083 7.15867 13.251 7.14 13.475C7.10267 13.9977 7.00933 14.7817 6.86 15.827L6.776 16.415C6.58933 17.6843 6.39333 18.7857 6.188 19.719C5.98267 20.6523 5.69333 21.5483 5.32 22.407C5.05867 22.967 4.68533 23.555 4.2 24.171C3.73333 24.787 3.26667 25.095 2.8 25.095C2.66933 25.095 2.548 25.067 2.436 25.011C2.1 24.843 1.932 24.3297 1.932 23.471C1.932 22.911 2.02533 22.0523 2.212 20.895L2.296 20.251L2.744 16.079C2.856 15.2577 2.93067 14.6417 2.968 14.231L2.492 14.511C1.63333 15.071 1.01733 15.351 0.644 15.351C0.494667 15.351 0.373333 15.3137 0.28 15.239C0.0933333 15.071 0 14.875 0 14.651C0 14.259 0.205333 13.8297 0.616 13.363C1.02667 12.8963 1.428 12.523 1.82 12.243C1.988 12.1123 2.17467 12.0003 2.38 11.907C2.73467 11.683 2.98667 11.4777 3.136 11.291C3.304 11.0857 3.388 10.7683 3.388 10.339C3.388 10.0217 3.32267 9.667 3.192 9.275C3.09867 9.01367 2.95867 8.76167 2.772 8.519C2.58533 8.25767 2.47333 8.099 2.436 8.043C2.17467 7.66967 1.97867 7.371 1.848 7.147C1.71733 6.90433 1.652 6.643 1.652 6.363C1.652 6.139 1.708 5.887 1.82 5.607C2.08133 5.00967 2.52 4.50567 3.136 4.095C3.77067 3.68433 4.58267 3.26433 5.572 2.835L6.328 2.499C7.84 1.78967 9.24933 1.22033 10.556 0.791C11.8813 0.343 13.1787 0.0816666 14.448 0.00699982Z" fill="#1E1E1E" />
                <path d="M28.9128 0.00699982C29.6782 -0.0489995 30.0608 0.231001 30.0608 0.847001C30.0608 1.16433 29.9582 1.52833 29.7528 1.939C29.5662 2.331 29.3515 2.67633 29.1088 2.975C28.8662 3.27367 28.6328 3.479 28.4088 3.591C28.2035 3.68433 27.9702 3.731 27.7088 3.731L26.9248 3.703C26.6635 3.703 26.4582 3.72167 26.3088 3.759C25.3942 3.94567 24.4235 4.18833 23.3968 4.487C23.3782 4.487 23.1728 4.53367 22.7808 4.627C22.7062 4.64567 22.5195 4.69233 22.2208 4.767C21.9408 4.823 21.6888 4.88833 21.4648 4.963C21.2595 5.03767 21.1102 5.131 21.0168 5.243C20.8302 5.42967 20.7368 5.719 20.7368 6.111C20.7368 6.48433 20.8115 6.93233 20.9608 7.455C21.1288 7.959 21.2222 8.25767 21.2408 8.351C21.4462 8.92967 21.5582 9.34033 21.5768 9.583C22.3235 9.32167 23.2102 9.06033 24.2368 8.799C25.2635 8.519 26.1688 8.379 26.9528 8.379C28.0542 8.379 28.6048 8.70567 28.6048 9.359C28.6048 9.65767 28.4835 10.0403 28.2408 10.507C27.9795 10.955 27.6715 11.291 27.3168 11.515C26.9622 11.739 26.5982 11.8883 26.2248 11.963C25.8515 12.019 25.3475 12.075 24.7128 12.131C24.6008 12.131 24.4328 12.1403 24.2088 12.159C24.0035 12.1777 23.8262 12.1963 23.6768 12.215C23.5835 12.2337 23.3782 12.2617 23.0608 12.299C22.7435 12.3177 22.4728 12.3737 22.2488 12.467C21.9688 12.579 21.7915 12.663 21.7168 12.719C21.6608 12.7563 21.6328 12.8403 21.6328 12.971C21.6328 13.083 21.6235 13.251 21.6048 13.475C21.5675 13.9977 21.4742 14.7817 21.3248 15.827L21.2408 16.415C21.0542 17.6843 20.8582 18.7857 20.6528 19.719C20.4475 20.6523 20.1582 21.5483 19.7848 22.407C19.5235 22.967 19.1502 23.555 18.6648 24.171C18.1982 24.787 17.7315 25.095 17.2648 25.095C17.1342 25.095 17.0128 25.067 16.9008 25.011C16.5648 24.843 16.3968 24.3297 16.3968 23.471C16.3968 22.911 16.4902 22.0523 16.6768 20.895L16.7608 20.251L17.2088 16.079C17.3208 15.2577 17.3955 14.6417 17.4328 14.231L16.9568 14.511C16.0982 15.071 15.4822 15.351 15.1088 15.351C14.9595 15.351 14.8382 15.3137 14.7448 15.239C14.5582 15.071 14.4648 14.875 14.4648 14.651C14.4648 14.259 14.6702 13.8297 15.0808 13.363C15.4915 12.8963 15.8928 12.523 16.2848 12.243C16.4528 12.1123 16.6395 12.0003 16.8448 11.907C17.1995 11.683 17.4515 11.4777 17.6008 11.291C17.7688 11.0857 17.8528 10.7683 17.8528 10.339C17.8528 10.0217 17.7875 9.667 17.6568 9.275C17.5635 9.01367 17.4235 8.76167 17.2368 8.519C17.0502 8.25767 16.9382 8.099 16.9008 8.043C16.6395 7.66967 16.4435 7.371 16.3128 7.147C16.1822 6.90433 16.1168 6.643 16.1168 6.363C16.1168 6.139 16.1728 5.887 16.2848 5.607C16.5462 5.00967 16.9848 4.50567 17.6008 4.095C18.2355 3.68433 19.0475 3.26433 20.0368 2.835L20.7928 2.499C22.3048 1.78967 23.7142 1.22033 25.0208 0.791C26.3462 0.343 27.6435 0.0816666 28.9128 0.00699982Z" fill="#1E1E1E" />
                <path d="M34.774 11.095C36.286 9.67633 37.6394 8.491 38.834 7.539C37.8634 7.483 36.4074 7.36167 34.466 7.175C34.6154 8.59367 34.718 9.90033 34.774 11.095ZM44.49 3.927C44.7327 4.095 44.854 4.319 44.854 4.599C44.854 5.271 44.2847 6.14833 43.146 7.231C42.026 8.295 40.43 9.64833 38.358 11.291C37.2754 12.1497 36.454 12.8123 35.894 13.279C35.3527 13.7457 35.0167 14.1003 34.886 14.343C34.7927 14.511 34.7274 14.707 34.69 14.931C34.6527 15.155 34.634 15.3977 34.634 15.659C34.634 15.9017 34.6247 16.107 34.606 16.275C34.4754 17.1897 34.326 17.9923 34.158 18.683C33.99 19.3737 33.794 19.9803 33.57 20.503C33.3647 21.0257 33.0754 21.4923 32.702 21.903C32.4594 22.183 32.1794 22.4443 31.862 22.687C31.5447 22.911 31.246 23.023 30.966 23.023C30.3314 23.023 30.014 22.5097 30.014 21.483C30.014 21.147 30.042 20.7643 30.098 20.335C30.1727 19.887 30.2194 19.5977 30.238 19.467L30.378 18.571C29.9674 18.907 29.594 19.075 29.258 19.075C29.034 19.075 28.866 19.0003 28.754 18.851C28.642 18.7017 28.586 18.4963 28.586 18.235C28.586 17.8617 28.6887 17.479 28.894 17.087C29.062 16.751 29.3607 16.3497 29.79 15.883C30.126 15.491 30.3594 15.1923 30.49 14.987C30.6394 14.763 30.742 14.5203 30.798 14.259C30.9474 13.307 31.022 12.3923 31.022 11.515C31.022 10.8057 30.9847 10.1803 30.91 9.639C30.854 9.191 30.77 8.75233 30.658 8.323C30.6394 8.22967 30.5834 7.94967 30.49 7.483C30.3967 6.99767 30.35 6.54967 30.35 6.139C30.35 4.16033 31.47 3.171 33.71 3.171C33.9527 3.171 34.3167 3.18967 34.802 3.227C35.9967 3.339 37.4247 3.41367 39.086 3.451L39.954 3.479L41.998 3.451C43.174 3.451 44.0047 3.60967 44.49 3.927Z" fill="#1E1E1E" />
            </svg>
        </Link>
    )
}