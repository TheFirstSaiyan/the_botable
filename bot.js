console.log("beginning of a new era!");
let Twit=require('twit');
let config=require('./config');
let T = new Twit(config);
let getJSON =require('get-json');
const MAXLENGTH=270;
let stream=T.stream('user');
stream.on('follow',thankUser);
function thankUser(data)
{
postOnTwitter('Thank you @'+data.source.screen_name+' for following me and it seems that you are ' +data.source.description+'! \#thirukkural \#tamilmayam');
}
let ids=[];
for(let i=1;i<=1080;i++)
{

ids.push(i);

}
tweet();
setInterval(tweet,1000*60*60*24);
function tweet()
{
if(ids.length>=1)
{
  let url='http://infinitekural.net/api/kurals?id=';
  let id= ids[Math.floor(Math.random()*ids.length)];
  console.log(id);
  console.log(ids.indexOf(id));
  ids.splice(ids.indexOf(id),1);
  console.log(ids.indexOf(id));
  url=url+id;
  getJSON(url,gotResult);
}
}

//POST
function gotResult(err,result)
{
  if(err) console.log("something wrong hmmmmmmmm...");
  else
  {
    let remainingLength = MAXLENGTH;
    let baseData=result[0];
    let text='adhigaram :  '+baseData.chapter+'\n\nkural          :  '+baseData.firstLine+'\n                     '+baseData.secondLine;
    remainingLength = remainingLength-text.length;
    let meaning = '\n\nmeaning    :  '+ baseData.explanation;
    let hashtags =' \#thirukkural';
    let englishKural='\n\nmeaning    :  '+baseData.english;
    if(meaning.length+hashtags.length <= remainingLength)
    text = text +meaning + hashtags;
    else {
    text=text+ englishKural +hashtags;
    }

  postOnTwitter(text);

}
}

function postOnTwitter(text)
{
  let query={
    status:text
  };
  T.post('statuses/update', query, posted);
  function posted(err,data,response)
  {
  if(err) console.log(err);
  else
    console.log("in progress");
}

}
