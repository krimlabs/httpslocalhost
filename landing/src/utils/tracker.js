const trackMacAppDownload = () => {
  console.log("Tracker called")
  if (window.location.host === 'httpslocalhost.com') {
    window.ga('send', 'event', 'mac-app', 'download')
  }
}

export {trackMacAppDownload};