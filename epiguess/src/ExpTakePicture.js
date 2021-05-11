import React from 'react';
import Webcam from 'react-webcam';
import $ from 'jquery';






class ExpTakePicture extends React.Component{
	
	
    constructor(props) {
        super();
    }
	
	
	
    //Transition to the next path/state
    handleClick = (event, path) => {
        this.props.history.push(path);
    }
    //Trigger method takePicture() in parent
    takePicture2 = (event) => {
		this.refs.webcam.getCanvas().toBlob(
			function(blob){
				var newImg = document.createElement('img');
				var url = URL.createObjectURL(blob);
				newImg.src = url;
				newImg.id = "ss";
				document.body.appendChild(newImg);	
				
			});
    }
	
    choosePicture = (event) => {
        //let imageSrc = $('#ss').attr('src');
		//console.log(imageSrc);
		let image=this.refs.webcam.getScreenshot({width: 800, height: 600});
		//console.log(image);
        this.props.callbackFromParent(image); //pass image
        
        
        global.myImage = image; // HELP!! Jens fix this!

        this.handleClick(event, '/ExpPreGameInstruction')
    }

    render() {
        return (
            <div>
				<Webcam	audio={false} ref="webcam" screenshotFormat="image/jpeg" style={style.video} />
                <div className= "jumbotron text-center"> 
					
                    <button  onClick={(e) => this.choosePicture(e)} type="submit" className="btn btn-primary">Ta bild</button>
					
                </div>
                
                <div className="form-group mt-20"></div>
            </div>
        );
    }
}

const style = {

	video: {
		position: 'relative',
		left: '25%'

	}
}

export default ExpTakePicture;