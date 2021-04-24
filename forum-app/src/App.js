// NO MODAL
import './App.css';
import React, { Component } from 'react'
import NewForm from './components/NewForm'
import TopicTable from './components/TopicTable'
import Nav from './components/Nav'





// more on React environment variables
// https://create-react-app.dev/docs/adding-custom-environment-variables/

let baseUrl = process.env.REACT_APP_BACKENDURL
console.log(baseUrl)
// let baseUrl = 'http://localhost:3003'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      modalOpen: false,
      topicToBeEdited:[],
      name: '',
      userLogedIn: false
    }

  }

  getTopics = () => {
    // fetch to the backend
    fetch(baseUrl + "/topics",{
      credentials: "include"
    })
    .then(res => {
      if (res.status===200){
        return res.json()
      }
      else {
        return []
      }
    }).then(data => {
      console.log(data)
      this.setState({
        topics: data,
      })
     })
  }

  addTopic = (newTopic) => {
    const copyTopics = [...this.state.topics]
    copyTopics.push(newTopic)
    this.setState({
      topics: copyTopics,
    })
  }
  loggingUser = async (e) => {
    console.log('loggingUser')
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const logindBody = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(logindBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })

      console.log(response)
      console.log("BODY: ",response.body)

      if (response.status === 200) {
        this.getTopics()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/users/signup'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        this.getTopics()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  deleteTopic = async (id) => {
    const url = baseUrl + '/topics/' + id

    try{
      const response = await fetch( url, {
        method: 'DELETE',
        credentials: "include"
      })

      if (response.status===200){

        const findIndex = this.state.topics.findIndex(topics => topics._id === id)
        const copyTopics = [...this.state.topics]
        copyTopics.splice(findIndex, 1)

        this.setState({
          topics: copyTopics
        })
      }

    }
    catch(err){
      console.log('Error => ', err);
    }
  }



handleSubmit = async (e) => {
  e.preventDefault()
    const url = baseUrl + '/topics/' + this.state.topicToBeEdited._id
    console.log(this.state.topicToBeEdited._id)
    try{
      const response = await fetch( url , {
        method: 'PUT',
        body: JSON.stringify({
          name: e.target.name.value,

        }),
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: "include"
      })

      if (response.status===200){
        const updatedTopics = await response.json()
        const findIndex = this.state.topics.findIndex(topics => topics._id === updatedTopics.data._id)
        const copyTopics = [...this.state.topics]
        copyTopics[findIndex] = updatedTopics.data

        this.setState({
          topics: copyTopics,
          modalOpen:false
        })
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }



  componentDidMount() {
    this.getTopics()
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (topic)=>{
    this.setState({
      modalOpen:true,
      name: topic.name,
      topicToBeEdited:topic
    })
  }

  render () {
    console.log(this.state.topics)

    return (
      <div className="App">
        <Nav loggingUser={this.loggingUser} register={this.register}/>

          <h1> Nintendo Power Re: </h1>
          <p class="intro">Welcome to the Collector's tracker! finally keep track easily of all those rare collectable games from the Nes and Snes!</p>

        <img src="https://i.imgur.com/JitideV.jpg" alt=""  class="article1" width="300" height="200" />
        <p class="article1description">Add your Nes/Snes Games collection here</p>
          <NewForm baseUrl={ baseUrl } addTopic={ this.addTopic } />

          <TopicTable
            topics={this.state.topics}
            deleteTopic={this.deleteTopic}
            showEditForm={this.showEditForm}
            />
          <br/>
          <br/>

          {this.state.modalOpen &&

            <form onSubmit={this.handleSubmit}>
              <label>Edit: </label>
              <input name="name" value={this.state.name} onChange={this.handleChange}/> <br/>
              <button>submit Edit</button>

            </form>
          }
      </div>
    );
  }
}

export default App;
