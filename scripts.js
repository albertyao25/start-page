/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"71DxHlZgmY56qXsP","label":"media","bookmarks":[{"id":"SAHTL8tenARGj8Fz","label":"youtube","url":"https://www.youtube.com"},{"id":"hH1SuArvruXbpATp","label":"twitch","url":"https://www.twitch.tv/"},{"id":"zdeRIegosh5CeIF1","label":"動畫瘋","url":"https://ani.gamer.com.tw/mygather.php"}]},{"id":"pkko19pPoJPUywko","label":"google","bookmarks":[{"id":"sRFB8NfhiU8F8rnA","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"mblhVp4N0IvfRaxO","label":"drive","url":"https://drive.google.com/drive/u/0/my-drive"},{"id":"kQrJkCEJJv15cnDZ","label":"calendar","url":"https://calendar.google.com/calendar/u/0/r"}]},{"id":"spIkfxPqacDwHxIg","label":"news","bookmarks":[{"id":"rWMJuJCEZtJp0LhB","label":"new york times","url":"https://www.nytimes.com/"},{"id":"UPSMN9620wGcceSk","label":"crimson","url":"https://www.thecrimson.com/"},{"id":"mzgxGiJXruj52bdu","label":"reuters","url":"https://www.reuters.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
