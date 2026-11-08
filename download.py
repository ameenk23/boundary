import yt_dlp

url = "https://vimeo.com/468566530"

opts = {
    "cookiefile": "cookies.txt",
    "format": "bestvideo+bestaudio/best",
    "outtmpl": "vimeo_468566530.%(ext)s",
    "merge_output_format": "mp4",
}

with yt_dlp.YoutubeDL(opts) as ydl:
    ydl.download([url])