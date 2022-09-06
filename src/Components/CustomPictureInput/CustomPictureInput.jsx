import "./custom-picture-input.style.css";
import {ReactComponent as Photo} from "../../icons/photoEditor/Photo.svg";
import {ReactComponent as Trash} from "../../icons/photoEditor/Trash.svg";
import {ReactComponent as Scale} from "../../icons/photoEditor/Scale.svg";
import {ReactComponent as Fullscreen} from "../../icons/photoEditor/Fullscreen.svg";
import {ReactComponent as Filter} from "../../icons/photoEditor/Filter.svg";
import Basketball from "../../icons/Basketball.jpg";

const CustomPictureInput = ({handleChange, label, ...otherProps}) => {
    return (
        <div>
            <label className="form-label" htmlFor="pictureInput">{label}</label>
            <div className={"form-picture"}>
                <img className={"form-img"} src={Basketball} alt="Basketball"/>

                <div>
                    <div className={"red-circle center-icon"}>
                        <Photo className={"icon-photo"}/>
                    </div>
                    <div className={"center-span"}>
                        <div className={"span-under-photo-icon"}>
                            <span className={"span-add-picture"}>+Add picture</span> or drop it right here
                            <br/> You can add next formats: png. jpg. jpeg. tif
                        </div>
                    </div>
                </div>

                <div className={"red-circle first-right-icon"}>
                    <Filter className={"form-icons icon-filter"}/>
                </div>
                <div className={"red-circle second-right-icon"}>
                    <Scale className={"form-icons icon-scale"}/>
                </div>
                <div className={"red-circle third-right-icon"}>
                    <Trash className={"form-icons icon-trash"}/>
                </div>
                <div className={"red-circle fourth-right-icon"}>
                    <Fullscreen className={"form-icons icon-fullscreen"}/>
                </div>
            </div>
        </div>
    );
}

export default CustomPictureInput;