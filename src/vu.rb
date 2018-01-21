#!/usr/bin/env ruby
require 'bundler'

gem 'em-websocket'

require 'em-websocket'
require 'open-uri'
require 'json'

Thread.new do 
	loop do
		begin
			dat = open('http://134.219.88.123/realtime_status.txt').read.split(";\r\n")
			EM.next_tick { $clients.map { |c| c.send dat[2..3].map(&:to_i).to_json } }
			sleep 0.2
		rescue
			p $!
		end
	end
end

$clients = []

EM.run {
	EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
		ws.onopen { |handshake|
			$clients << ws 
		}
		ws.onclose { $clients.delete ws }
	end
}