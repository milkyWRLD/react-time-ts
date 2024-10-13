import moment from 'moment'
import React, { useState } from 'react'

interface DateTimeProps {
	date: string
}

function DateTime(props: DateTimeProps) {
	return <p className='date'>{props.date}</p>
}

const withPrettyDate = <P extends DateTimeProps>(
	Component: React.ComponentType<P>
) => {
	return function DateTimePretty(props: P) {
		const formatDate = (date: string) => {
			const currentDate = moment()
			const inputDate = moment(date)

			const diffMinutes = currentDate.diff(inputDate, 'minutes')
			const diffHours = currentDate.diff(inputDate, 'hours')
			const diffDays = currentDate.diff(inputDate, 'days')

			if (diffMinutes < 60) {
				return `${diffMinutes} минут назад`
			} else if (diffHours < 24) {
				return `${diffHours} часов назад`
			} else {
				return `${diffDays} дней назад`
			}
		}

		const formattedDate = formatDate(props.date)

		return <Component {...props} date={formattedDate} />
	}
}

const DateTimePretty = withPrettyDate(DateTime)

interface VideoProps {
	url: string
	date: string
}

function Video(props: VideoProps) {
	return (
		<div className='video'>
			<iframe
				src={props.url}
				frameBorder='0'
				allow='autoplay; encrypted-media'
				allowFullScreen
			></iframe>
			<DateTimePretty date={props.date} />
		</div>
	)
}

interface VideoListProps {
	list: VideoProps[]
}

function VideoList(props: VideoListProps) {
	return props.list.map((item, index) => (
		<Video key={index} url={item.url} date={item.date} />
	))
}

export default function App() {
	const [list, setList] = useState([
		{
			url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
			date: '2017-07-31 13:24:00',
		},
		{
			url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
			date: '2018-03-03 12:10:00',
		},
		{
			url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
			date: '2018-02-03 23:16:00',
		},
		{
			url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
			date: '2018-01-03 12:10:00',
		},
		{
			url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
			date: '2024-01-07 22:24:00',
		},
		{
			url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
			date: '2024-01-07 05:24:00',
		},
	])

	return <VideoList list={list} />
}
