const roomsData = [
    { id: 1, building: 'A', floor: '1', number: 'A-101', type: 'single', available: true, occupants: 0, maxOccupants: 1 },
    { id: 2, building: 'A', floor: '1', number: 'A-102', type: 'single', available: false, occupants: 1, maxOccupants: 1 },
    { id: 3, building: 'A', floor: '1', number: 'A-103', type: 'double', available: true, occupants: 0, maxOccupants: 2 },
    { id: 4, building: 'A', floor: '1', number: 'A-104', type: 'double', available: true, occupants: 1, maxOccupants: 2 },
    { id: 5, building: 'A', floor: '1', number: 'A-105', type: 'triple', available: true, occupants: 2, maxOccupants: 3 },
    { id: 6, building: 'A', floor: '1', number: 'A-106', type: 'quad', available: false, occupants: 4, maxOccupants: 4 },
    { id: 7, building: 'A', floor: '1', number: 'A-107', type: 'single', available: true, occupants: 0, maxOccupants: 1 },
    { id: 8, building: 'A', floor: '1', number: 'A-108', type: 'double', available: false, occupants: 2, maxOccupants: 2 },
    { id: 9, building: 'A', floor: '1', number: 'A-109', type: 'double', available: true, occupants: 1, maxOccupants: 2 },
    { id: 10, building: 'A', floor: '1', number: 'A-110', type: 'triple', available: true, occupants: 0, maxOccupants: 3 },
    { id: 11, building: 'A', floor: '1', number: 'A-111', type: 'single', available: false, occupants: 1, maxOccupants: 1 },
    { id: 12, building: 'A', floor: '1', number: 'A-112', type: 'quad', available: true, occupants: 2, maxOccupants: 4 },
    { id: 13, building: 'A', floor: '2', number: 'A-201', type: 'single', available: true, occupants: 0, maxOccupants: 1 },
    { id: 14, building: 'B', floor: '1', number: 'B-101', type: 'double', available: true, occupants: 0, maxOccupants: 2 },
    { id: 15, building: 'C', floor: '3', number: 'C-301', type: 'triple', available: false, occupants: 3, maxOccupants: 3 }
];

function searchRooms() {
    const building = document.getElementById('building').value;
    const floor = document.getElementById('floor').value;
    const roomType = document.getElementById('room-type').value;
    const roomNumber = document.getElementById('room-number').value.trim();
    
    let filteredRooms = roomsData;
    
    if (building) {
        filteredRooms = filteredRooms.filter(room => room.building === building);
    }
    
    if (floor) {
        filteredRooms = filteredRooms.filter(room => room.floor === floor);
    }
    
    if (roomType) {
        filteredRooms = filteredRooms.filter(room => room.type === roomType);
    }
    
    if (roomNumber) {
        filteredRooms = filteredRooms.filter(room => room.number.toLowerCase().includes(roomNumber.toLowerCase()));
    }
    
    displayRooms(filteredRooms);
}

function displayRooms(rooms) {
    const container = document.getElementById('rooms-container');
    container.innerHTML = '';
    
    if (rooms.length === 0) {
        container.innerHTML = '<p>No rooms found matching your criteria. Please try a different search.</p>';
        return;
    }
    
    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        
        const roomInfo = document.createElement('div');
        roomInfo.className = 'room-info';
        
        const roomTitle = document.createElement('h3');
        roomTitle.textContent = `Room ${room.number} (${room.type.charAt(0).toUpperCase() + room.type.slice(1)})`;
        
        const roomDetails = document.createElement('p');
        roomDetails.textContent = `Building ${room.building}, Floor ${room.floor}`;
        
        const roomStatus = document.createElement('p');
        if (room.available) {
            roomStatus.textContent = `Available: ${room.occupants}/${room.maxOccupants} occupants`;
            roomStatus.style.color = 'green';
        } else {
            roomStatus.textContent = `Full: ${room.occupants}/${room.maxOccupants} occupants`;
            roomStatus.style.color = 'red';
        }
        
        roomInfo.appendChild(roomTitle);
        roomInfo.appendChild(roomDetails);
        roomInfo.appendChild(roomStatus);
        
        const roomActions = document.createElement('div');
        roomActions.className = 'room-actions';
        
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View on Map';
        viewButton.onclick = function() {
            openTab(null, 'map-tab');
            document.getElementById('map-building').value = room.building;
            document.getElementById('map-floor').value = room.floor;
            updateFloorMap();
            setTimeout(() => {
                highlightRoom(room.number);
            }, 100);
        };
        
        roomActions.appendChild(viewButton);
        
        roomCard.appendChild(roomInfo);
        roomCard.appendChild(roomActions);
        
        container.appendChild(roomCard);
    });
}

function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Remove active class from all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Show the current tab and add active class to the button
    document.getElementById(tabName).classList.add('active');
    if (evt) {
        evt.currentTarget.classList.add('active');
    } else {
        // Find and activate the tab by name
        const allTabs = document.getElementsByClassName('tab');
        for (let i = 0; i < allTabs.length; i++) {
            if (allTabs[i].textContent.includes(tabName.replace('-tab', ''))) {
                allTabs[i].classList.add('active');
                break;
            }
        }
    }
}

function updateFloorMap() {
    const building = document.getElementById('map-building').value;
    const floor = document.getElementById('map-floor').value;
    
    // In a real app, this would update the SVG to show the selected building and floor
    // For this demo, we'll just update the room IDs and text
    
    const rooms = document.querySelectorAll('#rooms rect.room');
    const roomTexts = document.querySelectorAll('#rooms text');
    
    for (let i = 0; i < rooms.length; i++) {
        const newRoomNumber = `${building}-${floor}${i < 9 ? '0' : ''}${i+1}`;
        rooms[i].id = `room-${newRoomNumber}`;
        rooms[i].setAttribute('onclick', `highlightRoom('${newRoomNumber}')`);
        roomTexts[i].textContent = newRoomNumber;
        
        // Reset colors
        rooms[i].setAttribute('fill', 'white');
    }
}

function highlightRoom(roomNumber) {
    // Reset all rooms to default color
    const rooms = document.querySelectorAll('#rooms rect.room');
    rooms.forEach(room => {
        room.setAttribute('fill', 'white');
    });
    
    // Highlight the selected room
    const roomElement = document.getElementById(`room-${roomNumber}`);
    if (roomElement) {
        roomElement.setAttribute('fill', '#ffffcc');
        
        // Scroll to make sure the room is visible
        roomElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize with some results
document.addEventListener('DOMContentLoaded', function() {
    displayRooms(roomsData.filter(room => room.building === 'A' && room.floor === '1'));
});
