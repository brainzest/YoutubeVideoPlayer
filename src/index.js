import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY='AIzaSyCcUZZJ3t4Yv5bH9wKX8JXxPkFIhTGN7sI';



//MAIN COMPONENT

class App extends Component{
  constructor(props){
    super(props);
    this.state  = { videos:[], selected: null};
    this.videoSearch('reactJs tutorial')
  }
  videoSearch(term){
    YTSearch({key:API_KEY,term:term}, (videos) =>{
      this.setState({
        videos:videos,
        selected:videos[0]
      }) //when key and property are same in ES6 "videos"
      //similar to this.setState({videos:videos})
    })
  }
  render(){
    const videoSearch =_.debounce((term)=>{this.videoSearch(term)},400);
    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selected} />
        <VideoList videos={this.state.videos}
          onVideoSelect={selected=>this.setState({selected})} />
      </div>
    );
  }
}

// take this component genereated htm and render it on DOM

ReactDOM.render(<App />,document.querySelector('.container'))
