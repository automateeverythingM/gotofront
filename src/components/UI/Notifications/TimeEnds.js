import { ReactComponent as Success } from "../../../img/svg/notification/success.svg";

function TimeEnds() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 border-8 border-gray-800">
            <div>
                <h1 className="text-5xl p-6 bg-gray-800 text-gray-100">
                    Congratulations!!!
                </h1>
                <Success />
            </div>
        </div>
    );
}
export default TimeEnds;
