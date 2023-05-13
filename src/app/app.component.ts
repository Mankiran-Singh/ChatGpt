import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {environment} from 'src/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chatgpt';
  fileName = '';

  reviewText:any;
  onFileSelected(event:any) {
      const file:File = event.target.files[0];
      let fileReader=new FileReader();
      fileReader.onload = ()=>{
        const filePath=fileReader.result
        this.openAi(filePath);
      }    
      fileReader.readAsText(file)
  }

 async openAi(filePath:any){
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: environment.OPEN_AI_API_KEY,
    });

    const prompt=`Review code using chatGpt ${filePath}`
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
     model: "text-davinci-003",
     temperature:0.2,
     max_tokens:1024,
     prompt: prompt,
   });
        this.reviewText=completion.data.choices[0].text;
  }
}

