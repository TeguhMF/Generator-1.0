const members = [
    { name: "TEGUH MAULANA FIRMANSYAH", color: "#4361ee" },
    { name: "AHDHAN SETYA ANANTA", color: "#4895ef" },
    { name: "AJI MULYA WARDANA", color: "#3a0ca3" },
    { name: "ALFAWAID DHABBYISH", color: "#4cc9f0" },
    { name: "ALYA GHINA KHOIRUNNISA.S", color: "#f72585" }, 
    { name: "ANDIKA SEPTA NUGRAHA", color: "#7209b7" },
    { name: "AQILLAH FADLUROHMAN", color: "#560bad" },
    { name: "DELLA NANDA SAPUTRI", color: "#480ca8" },
    { name: "BINTANG SHERLY INDANA", color: "#3a0ca3" },
    { name: "HARYA RACHMAT SUZANA", color: "#3f37c9" },
    { name: "DENNIS NUR HAKIM", color: "#4361ee" },
    { name: "AHMAD REIGY AZHALIS", color: "#4895ef" },
    { name: "DIVA HANDIKA NOVAL", color: "#4cc9f0" },
    { name: "ERLANGGA RIZKY GIONI", color: "#f72585" },
    { name: "FADJAR ILHAM RIFAI", color: "#b5179e" },
    { name: "ASKA AGNIYA MARASABESSY", color: "#7209b7" },
    { name: "SAHRUL HIDAYAT", color: "#560bad" },
    { name: "MUH RICHARD TRIJULIANTO", color: "#480ca8" },
    { name: "M.ABIDZAR ALGHIFARI", color: "#3a0ca3" },
    { name: "M.RAJI HAIKRAL", color: "#3f37c9" },
    { name: "M.FAIZ", color: "#4361ee" },
    { name: "M.NAUFAL DZAKWAN", color: "#4895ef" },
    { name: "NURHIDAYAT", color: "#4cc9f0" },
    { name: "NURIZKA SASI KIRANA", color: "#f72585" },
    { name: "RAHMAT MAULANA", color: "#b5179e" },
    { name: "RIVALDY DWI PUTRA", color: "#7209b7" },
    { name: "IBNU SALAM YAKIN", color: "#560bad" },
    { name: "SANDI BAGUS KRISNA", color: "#480ca8" },
    { name: "DINA AURA NUR", color: "#3a0ca3" },
    { name: "YOSE ALFREDOW", color: "#3f37c9" },
    { name: "OKTAFIANI CINDRIWATI ARI", color: "#4361ee" }
];

const groupCountInput = document.getElementById('groupCount');
const membersPerGroupInput = document.getElementById('membersPerGroup');
const generateBtn = document.getElementById('generateBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const resetBtn = document.getElementById('resetBtn');
const groupsContainer = document.getElementById('groupsContainer');

document.addEventListener('DOMContentLoaded', () => {
    generateBtn.addEventListener('click', generateGroups);
    exportPdfBtn.addEventListener('click', exportToPdf);
    resetBtn.addEventListener('click', resetGroups);
});

function generateGroups() {
    groupsContainer.classList.add('fade-out');
    setTimeout(() => {
        groupsContainer.innerHTML = '';
        groupsContainer.classList.remove('fade-out');
        
        const groupCount = parseInt(groupCountInput.value);
        const membersPerGroup = parseInt(membersPerGroupInput.value);
        
        if (groupCount < 2 || groupCount > 10) {
            showAlert('Jumlah kelompok harus antara 2-10', 'error');
            return;
        }

        const totalSlots = groupCount * membersPerGroup;
        if (totalSlots > members.length) {
            showAlert(`Tidak cukup anggota. Dibutuhkan ${totalSlots}, hanya tersedia ${members.length}`, 'error');
            return;
        }
        const shuffledMembers = [...members].sort(() => Math.random() - 0.5);
        
        const groupsGrid = document.createElement('div');
        groupsGrid.className = 'groups-grid';
        groupsContainer.appendChild(groupsGrid);
        
        for (let i = 0; i < groupCount; i++) {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.innerHTML = `
                <div class="group-header">
                    <div class="group-title">
                        <i class="fas fa-users"></i>
                        <span>Kelompok ${i+1}</span>
                    </div>
                    <div class="group-count">0/${membersPerGroup}</div>
                </div>
                <div class="member-list" data-group-id="${i}"></div>
            `;
            groupsGrid.appendChild(groupCard);
        }

        let memberIndex = 0;
        for (let i = 0; i < membersPerGroup; i++) {
            for (let j = 0; j < groupCount; j++) {
                if (memberIndex < shuffledMembers.length) {
                    addMemberToGroup(j, shuffledMembers[memberIndex]);
                    memberIndex++;
                }
            }
        }

        updateGroupCounts();
        setupDragAndDrop();
        showAlert(`Berhasil membuat ${groupCount} kelompok!`, 'success');
        
    }, 300);
}

function addMemberToGroup(groupId, member) {
    const groupLists = document.querySelectorAll('.member-list');
    const group = groupLists[groupId];
    
    const memberElement = document.createElement('div');
    memberElement.className = 'member';
    memberElement.draggable = true;
    memberElement.dataset.memberName = member.name;
    
    const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    memberElement.innerHTML = `
        <div class="member-avatar" style="background-color: ${member.color}">${initials}</div>
        <div class="member-name">${member.name}</div>
        <i class="fas fa-grip-lines"></i>
    `;
    
    group.appendChild(memberElement);
}

function updateGroupCounts() {
    const groupLists = document.querySelectorAll('.member-list');
    const membersPerGroup = parseInt(membersPerGroupInput.value);
    
    groupLists.forEach((group, index) => {
        const memberCount = group.children.length;
        const countElement = group.previousElementSibling.querySelector('.group-count');
        countElement.textContent = `${memberCount}/${membersPerGroup}`;
        
        if (memberCount > membersPerGroup) {
            countElement.style.backgroundColor = 'var(--danger)';
        } else if (memberCount === membersPerGroup) {
            countElement.style.backgroundColor = 'var(--success)';
        } else {
            countElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

function generateGroups() {
    groupsContainer.classList.add('fade-out');
    setTimeout(() => {
        groupsContainer.innerHTML = '';
        groupsContainer.classList.remove('fade-out');
        
        const groupCount = parseInt(groupCountInput.value);
        
        if (groupCount < 2 || groupCount > 10) {
            showAlert('Jumlah kelompok harus antara 2-10', 'error');
            return;
        }

        const shuffledMembers = [...members].sort(() => Math.random() - 0.5);
        
        const membersPerGroup = Math.ceil(members.length / groupCount);
        
        const groupsGrid = document.createElement('div');
        groupsGrid.className = 'groups-grid';
        groupsContainer.appendChild(groupsGrid);
        
        for (let i = 0; i < groupCount; i++) {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.innerHTML = `
                <div class="group-header">
                    <div class="group-title">
                        <i class="fas fa-users"></i>
                        <span>Kelompok ${i+1}</span>
                    </div>
                    <div class="group-count">0/${membersPerGroup}</div>
                </div>
                <div class="member-list" data-group-id="${i}"></div>
            `;
            groupsGrid.appendChild(groupCard);
        }

        // Distribute members
        let memberIndex = 0;
        for (let i = 0; i < membersPerGroup; i++) {
            for (let j = 0; j < groupCount; j++) {
                if (memberIndex < shuffledMembers.length) {
                    addMemberToGroup(j, shuffledMembers[memberIndex]);
                    memberIndex++;
                }
            }
        }

        // Update group counts
        updateGroupCounts();
        
        // Setup drag and drop
        setupDragAndDrop();
        
        // Show success message
        showAlert(`Berhasil membuat ${groupCount} kelompok!`, 'success');
        
    }, 300);
}

// Update group member counts (modifikasi)
function updateGroupCounts() {
    const groupLists = document.querySelectorAll('.member-list');
    const membersPerGroup = Math.ceil(members.length / parseInt(groupCountInput.value));
    
    groupLists.forEach((group, index) => {
        const memberCount = group.children.length;
        const countElement = group.previousElementSibling.querySelector('.group-count');
        countElement.textContent = `${memberCount}/${membersPerGroup}`;
        
        // Update color based on capacity
        if (memberCount > membersPerGroup) {
            countElement.style.backgroundColor = 'var(--danger)';
        } else if (memberCount === membersPerGroup) {
            countElement.style.backgroundColor = 'var(--success)';
        } else {
            countElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

// Helper function for better drag positioning
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.member:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Export to PDF with better styling
function exportToPdf() {
    if (!document.querySelector('.group-card')) {
        showAlert('Tidak ada kelompok untuk di-export', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add header
    doc.setFillColor(67, 97, 238);
    doc.rect(0, 0, 220, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('Daftar Kelompok Kuliah', 105, 20, { align: 'center' });
    
    // Add date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('id-ID', options);
    doc.setFontSize(10);
    doc.text(`Dibuat pada: ${dateStr}`, 14, 40);
    
    let yPosition = 50;
    let groupIndex = 1;
    
    document.querySelectorAll('.group-card').forEach(group => {
        // Add group title
        doc.setFontSize(14);
        doc.setTextColor(67, 97, 238);
        doc.text(`Kelompok ${groupIndex}`, 14, yPosition);
        yPosition += 8;
        
        // Add members
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        group.querySelectorAll('.member').forEach(member => {
            const name = member.querySelector('.member-name').textContent;
            doc.text(`• ${name}`, 20, yPosition);
            yPosition += 7;
            
            // Add new page if needed
            if (yPosition > 270 && groupIndex < document.querySelectorAll('.group-card').length) {
                doc.addPage();
                yPosition = 20;
            }
        });
        
        yPosition += 10;
        groupIndex++;
    });
    
    // Save PDF
    doc.save(`Kelompok_Kuliah_${today.getTime()}.pdf`);
    showAlert('PDF berhasil di-generate!', 'success');
}

// Reset groups with confirmation
function resetGroups() {
    if (confirm('Apakah Anda yakin ingin mereset semua kelompok?')) {
        groupsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users-slash"></i>
                <h3>No Groups Generated Yet</h3>
                <p>Configure settings above and click "Generate Groups" to start</p>
            </div>
        `;
        groupCountInput.value = 4;
        membersPerGroupInput.value = '';
        showAlert('Semua kelompok telah direset', 'info');
    }
}

// Show beautiful alert/notification
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}

// Add alert styles dynamically
const style = document.createElement('style');
style.textContent = `
    .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(150%);
        transition: all 0.3s ease;
    }
    
    .alert.show {
        transform: translateX(0);
    }
    
    .alert-success {
        background: #4bb543;
        color: white;
    }
    
    .alert-error {
        background: #ff3333;
        color: white;
    }
    
    .alert-info {
        background: #0099ff;
        color: white;
    }
    
    .fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
    
    @keyframes fadeOut {
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);