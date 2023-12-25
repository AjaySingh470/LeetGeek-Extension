// Just some constants
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`

const potdQuestion = JSON.stringify({
    query: "query questionOfToday {  activeDailyCodingChallengeQuestion {  date   userStatus  link   question {     acRate      difficulty     freqBar      frontendQuestionId: questionFrontendId    isFavor     paidOnly: isPaidOnly      status    title    titleSlug     hasVideoSolution      hasSolution      topicTags {       name       id       slug}}}}",
  })

const userInfo = JSON.stringify({
    query: "query globalData { userStatus {userId isSignedIn  username  }}"
})

// We can pass the JSON response as an object to our createTodoistTask later.
export async function getCookie()
  {
    const data = await chrome.cookies.get({name : "LEETCODE_SESSION" , url : "https://leetcode.com/"});
    return data
  }
export async function getPotd()
{
	const data = await chrome.cookies.get({name : "LEETCODE_SESSION" , url : "https://leetcode.com/"});
	let header = new Headers()
	console.log(data)
  header.append("Content-Type", "application/json");

	header.append("LEETCODE_SESSION",data.value)
	let request = {
		method : 'POST',
		headers : header,
		body : potdQuestion
	}
	// fetch("https://leetcode.com/graphql", request)
	// .then(response => response.json())
	// .then(result => {return result})
	// .catch(err => console.log(err))
	const reponse = await fetch("https://leetcode.com/graphql", request)
	const dataques = await reponse.json();
	
	const finaldata = dataques;
	return finaldata;
}