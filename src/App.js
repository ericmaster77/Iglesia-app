import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Users, MessageCircle, Bell, Plus, Edit, Trash2, Church, UserPlus, Heart, Settings, Home, Menu, X } from 'lucide-react';

// Componentes movidos fuera del componente principal
const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, menuItems, currentView, setCurrentView }) => (
  <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-blue-800">Menú</h2>
        <button onClick={() => setIsMobileMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                currentView === item.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  </div>
);

const ImageModal = ({ isImageModalOpen, selectedImage, closeImageModal }) => (
  <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 ${isImageModalOpen ? 'block' : 'hidden'}`}>
    <div className="relative max-w-4xl max-h-full">
      <button
        onClick={closeImageModal}
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
      >
        <X className="h-6 w-6" />
      </button>
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Imagen completa"
          className="max-w-full max-h-screen object-contain rounded-lg"
        />
      )}
    </div>
  </div>
);

const Header = ({ setIsMobileMenuOpen, menuItems, currentView, setCurrentView }) => (
  <header className="bg-blue-800 text-white p-4 shadow-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Church className="h-8 w-8" />
        <h1 className="text-xl font-bold">Gestión Iglesia</h1>
      </div>
      <div className="hidden md:flex space-x-6">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  </header>
);

const Dashboard = ({ events, volunteers, announcements, prayerRequests, openImageModal }) => (
  <div className="p-4 md:p-6">
    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Eventos Este Mes</p>
            <p className="text-3xl font-bold text-blue-600">{events.length}</p>
          </div>
          <Calendar className="h-12 w-12 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Voluntarios Activos</p>
            <p className="text-3xl font-bold text-green-600">{volunteers.length}</p>
          </div>
          <Users className="h-12 w-12 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Anuncios Activos</p>
            <p className="text-3xl font-bold text-orange-600">{announcements.length}</p>
          </div>
          <Bell className="h-12 w-12 text-orange-500" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Peticiones de Oración</p>
            <p className="text-3xl font-bold text-red-600">{prayerRequests.length}</p>
          </div>
          <Heart className="h-12 w-12 text-red-500" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Próximos Eventos</h3>
        <div className="space-y-4">
          {events.slice(0, 3).map(event => (
            <div key={event.id} className="p-4 border rounded-lg">
              {event.image && (
                <div className="mb-3">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openImageModal(event.image)}
                  />
                </div>
              )}
              <h4 className="font-semibold break-words">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.date} a las {event.time}</p>
              <div className="mt-2">
                <span className="text-sm text-blue-600">
                  Voluntarios: {event.volunteers.length}/{event.volunteersNeeded}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Anuncios Recientes</h3>
        <div className="space-y-4">
          {announcements.slice(0, 3).map(announcement => (
            <div key={announcement.id} className="p-4 border rounded-lg">
              {announcement.image && (
                <div className="mb-3">
                  <img 
                    src={announcement.image} 
                    alt={announcement.title}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openImageModal(announcement.image)}
                  />
                </div>
              )}
              <h4 className="font-semibold break-words">{announcement.title}</h4>
              <p className="text-sm text-gray-600 mt-2 break-words">{announcement.content}</p>
              <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {announcement.priority === 'high' ? 'Alta' :
                 announcement.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CalendarView = ({ events, volunteers, newEvent, handleEventChange, handleImageUpload, addEvent, enrollVolunteer, removeVolunteerFromEvent, openImageModal }) => (
  <div className="p-4 md:p-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
      <h2 className="text-2xl font-bold">Calendario de Eventos</h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Eventos Programados</h3>
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="p-4 border rounded-lg">
                {event.image && (
                  <div className="mb-4">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(event.image)}
                    />
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 space-y-2 md:space-y-0">
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>
                <p className="text-gray-600 mb-2 break-words">{event.description}</p>
                <p className="text-sm text-blue-600 mb-3">Hora: {event.time}</p>
                
                <div className="mb-4">
                  <h5 className="font-medium mb-2">
                    Voluntarios ({event.volunteers.length}/{event.volunteersNeeded})
                  </h5>
                  {event.volunteers.length > 0 ? (
                    <div className="space-y-2">
                      {event.volunteers.map(volunteer => (
                        <div key={volunteer.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-2 rounded space-y-2 sm:space-y-0">
                          <span className="text-sm">{volunteer.name} - {volunteer.ministry}</span>
                          <button
                            onClick={() => removeVolunteerFromEvent(event.id, volunteer.id)}
                            className="text-red-500 hover:text-red-700 self-start sm:self-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No hay voluntarios asignados</p>
                  )}
                </div>

                {event.volunteers.length < event.volunteersNeeded && (
                  <div className="mt-4">
                    <h6 className="text-sm font-medium mb-2">Asignar Voluntario:</h6>
                    <div className="flex flex-wrap gap-2">
                      {volunteers
                        .filter(v => !event.volunteers.find(ev => ev.id === v.id))
                        .map(volunteer => (
                        <button
                          key={volunteer.id}
                          onClick={() => enrollVolunteer(event.id, volunteer.id)}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 break-words"
                        >
                          + {volunteer.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Agregar Evento</h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Título del evento"
              value={newEvent.title}
              onChange={(e) => handleEventChange('title', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base break-words"
            />
          </div>
          <div>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => handleEventChange('date', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>
          <div>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => handleEventChange('time', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>
          <div>
            <textarea
              placeholder="Descripción"
              value={newEvent.description}
              onChange={(e) => handleEventChange('description', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none break-words"
              rows="3"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Voluntarios necesarios"
              min="1"
              value={newEvent.volunteersNeeded}
              onChange={(e) => handleEventChange('volunteersNeeded', parseInt(e.target.value))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del evento
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'event')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {newEvent.imagePreview && (
              <div className="mt-3">
                <img 
                  src={newEvent.imagePreview} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <button
            onClick={addEvent}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 text-sm md:text-base"
          >
            <Plus className="h-5 w-5" />
            <span>Agregar Evento</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const VolunteersView = ({ volunteers, setVolunteers, newVolunteer, handleVolunteerChange, addVolunteer }) => (
  <div className="p-4 md:p-6">
    <h2 className="text-2xl font-bold mb-6">Gestión de Voluntarios</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Lista de Voluntarios</h3>
          <div className="space-y-4">
            {volunteers.map(volunteer => (
              <div key={volunteer.id} className="p-4 border rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h4 className="font-semibold break-words">{volunteer.name}</h4>
                  <p className="text-sm text-gray-600 break-all">📞 {volunteer.phone}</p>
                  <p className="text-sm text-blue-600 break-words">Ministerio: {volunteer.ministry}</p>
                </div>
                <button
                  onClick={() => setVolunteers(volunteers.filter(v => v.id !== volunteer.id))}
                  className="text-red-500 hover:text-red-700 self-start sm:self-auto"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Agregar Voluntario</h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre completo"
              value={newVolunteer.name}
              onChange={(e) => handleVolunteerChange('name', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base break-words"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Teléfono"
              value={newVolunteer.phone}
              onChange={(e) => handleVolunteerChange('phone', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>
          <div>
            <select
              value={newVolunteer.ministry}
              onChange={(e) => handleVolunteerChange('ministry', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="">Seleccionar Ministerio</option>
              <option value="Alabanza">Alabanza</option>
              <option value="Ujieres">Ujieres</option>
              <option value="Niños">Niños</option>
              <option value="Jóvenes">Jóvenes</option>
              <option value="Ancianos">Ancianos</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Cocina">Cocina</option>
              <option value="Técnico">Técnico</option>
              <option value="Medios">Medios</option>
            </select>
          </div>
          <button
            onClick={addVolunteer}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 text-sm md:text-base"
          >
            <UserPlus className="h-5 w-5" />
            <span>Agregar Voluntario</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AnnouncementsView = ({ announcements, setAnnouncements, newAnnouncement, handleAnnouncementChange, handleImageUpload, addAnnouncement, openImageModal }) => (
  <div className="p-4 md:p-6">
    <h2 className="text-2xl font-bold mb-6">Anuncios de la Iglesia</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Anuncios Activos</h3>
          <div className="space-y-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="p-4 border rounded-lg">
                {announcement.image && (
                  <div className="mb-4">
                    <img 
                      src={announcement.image} 
                      alt={announcement.title}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(announcement.image)}
                    />
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                  <h4 className="font-semibold text-lg break-words">{announcement.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {announcement.priority === 'high' ? 'Alta' :
                       announcement.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                    <button
                      onClick={() => setAnnouncements(announcements.filter(a => a.id !== announcement.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-2 break-words">{announcement.content}</p>
                <p className="text-sm text-gray-500">Publicado: {announcement.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Crear Anuncio</h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Título del anuncio"
              value={newAnnouncement.title}
              onChange={(e) => handleAnnouncementChange('title', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base break-words"
            />
          </div>
          <div>
            <textarea
              placeholder="Contenido del anuncio"
              value={newAnnouncement.content}
              onChange={(e) => handleAnnouncementChange('content', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none break-words"
              rows="4"
            />
          </div>
          <div>
            <select
              value={newAnnouncement.priority}
              onChange={(e) => handleAnnouncementChange('priority', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="low">Prioridad Baja</option>
              <option value="medium">Prioridad Media</option>
              <option value="high">Prioridad Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del anuncio
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'announcement')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {newAnnouncement.imagePreview && (
              <div className="mt-3">
                <img 
                  src={newAnnouncement.imagePreview} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <button
            onClick={addAnnouncement}
            className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 flex items-center justify-center space-x-2 text-sm md:text-base"
          >
            <Bell className="h-5 w-5" />
            <span>Publicar Anuncio</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PrayerView = ({ prayerRequests, setPrayerRequests, newPrayerRequest, handlePrayerChange, addPrayerRequest }) => (
  <div className="p-4 md:p-6">
    <h2 className="text-2xl font-bold mb-6">Lista de Oración</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Peticiones de Oración</h3>
          <div className="space-y-4">
            {prayerRequests.map(request => (
              <div key={request.id} className="p-4 border rounded-lg border-l-4 border-red-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                  <h4 className="font-semibold break-words flex-1">{request.request}</h4>
                  <button
                    onClick={() => setPrayerRequests(prayerRequests.filter(r => r.id !== request.id))}
                    className="text-red-500 hover:text-red-700 self-start sm:self-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 break-words">Solicitado por: {request.requester}</p>
                <p className="text-sm text-gray-500">Fecha: {request.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Nueva Petición</h3>
        <div className="space-y-4">
          <div>
            <textarea
              placeholder="Petición de oración"
              value={newPrayerRequest.request}
              onChange={(e) => handlePrayerChange('request', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base resize-none break-words"
              rows="4"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nombre del solicitante"
              value={newPrayerRequest.requester}
              onChange={(e) => handlePrayerChange('requester', e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base break-words"
            />
          </div>
          <button
            onClick={addPrayerRequest}
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2 text-sm md:text-base"
          >
            <Heart className="h-5 w-5" />
            <span>Agregar Petición</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Componente principal
const ChurchManagementApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Estados para los datos
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Servicio Dominical',
      date: '2025-06-15',
      time: '10:00',
      description: 'Servicio principal dominical',
      volunteers: [],
      volunteersNeeded: 5,
      image: null
    },
    {
      id: 2,
      title: 'Estudio Bíblico',
      date: '2025-06-18',
      time: '19:00',
      description: 'Estudio bíblico semanal',
      volunteers: [],
      volunteersNeeded: 2,
      image: null
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Bienvenidos a Junio',
      content: 'Este mes estaremos enfocados en la oración y el servicio a la comunidad.',
      date: '2025-06-01',
      priority: 'high',
      image: null
    }
  ]);

  const [volunteers, setVolunteers] = useState([
    { id: 1, name: 'María González', phone: '555-0001', ministry: 'Alabanza' },
    { id: 2, name: 'Juan Pérez', phone: '555-0002', ministry: 'Ujieres' },
    { id: 3, name: 'Ana Rodríguez', phone: '555-0003', ministry: 'Niños' }
  ]);

  const [prayerRequests, setPrayerRequests] = useState([
    { id: 1, request: 'Sanidad para hermana Carmen', requester: 'María', date: '2025-06-10' },
    { id: 2, request: 'Trabajo para hermano Luis', requester: 'Pedro', date: '2025-06-12' }
  ]);

  // Formularios
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    volunteersNeeded: 1,
    image: null,
    imagePreview: null
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium',
    image: null,
    imagePreview: null
  });

  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    phone: '',
    ministry: ''
  });

  const [newPrayerRequest, setNewPrayerRequest] = useState({
    request: '',
    requester: ''
  });

  // Funciones para manejar imágenes
  const handleImageUpload = useCallback((e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        if (type === 'event') {
          setNewEvent(prev => ({
            ...prev,
            image: imageUrl,
            imagePreview: imageUrl
          }));
        } else if (type === 'announcement') {
          setNewAnnouncement(prev => ({
            ...prev,
            image: imageUrl,
            imagePreview: imageUrl
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Funciones para manejar cambios en formularios
  const handleEventChange = useCallback((field, value) => {
    setNewEvent(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAnnouncementChange = useCallback((field, value) => {
    setNewAnnouncement(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleVolunteerChange = useCallback((field, value) => {
    setNewVolunteer(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePrayerChange = useCallback((field, value) => {
    setNewPrayerRequest(prev => ({ ...prev, [field]: value }));
  }, []);

  // Función para abrir imagen en modal
  const openImageModal = useCallback((imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  }, []);

  // Funciones para agregar datos
  const addEvent = useCallback(() => {
    if (newEvent.title && newEvent.date) {
      setEvents(prev => [...prev, {
        ...newEvent,
        id: Date.now(),
        volunteers: []
      }]);
      setNewEvent({ 
        title: '', 
        date: '', 
        time: '', 
        description: '', 
        volunteersNeeded: 1,
        image: null,
        imagePreview: null
      });
    }
  }, [newEvent]);

  const addAnnouncement = useCallback(() => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements(prev => [...prev, {
        ...newAnnouncement,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewAnnouncement({ 
        title: '', 
        content: '', 
        priority: 'medium',
        image: null,
        imagePreview: null
      });
    }
  }, [newAnnouncement]);

  const addVolunteer = useCallback(() => {
    if (newVolunteer.name) {
      setVolunteers(prev => [...prev, {
        ...newVolunteer,
        id: Date.now()
      }]);
      setNewVolunteer({ name: '', phone: '', ministry: '' });
    }
  }, [newVolunteer]);

  const addPrayerRequest = useCallback(() => {
    if (newPrayerRequest.request && newPrayerRequest.requester) {
      setPrayerRequests(prev => [...prev, {
        ...newPrayerRequest,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewPrayerRequest({ request: '', requester: '' });
    }
  }, [newPrayerRequest]);

  const enrollVolunteer = useCallback((eventId, volunteerId) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const volunteer = volunteers.find(v => v.id === volunteerId);
        if (volunteer && !event.volunteers.find(v => v.id === volunteerId)) {
          return {
            ...event,
            volunteers: [...event.volunteers, volunteer]
          };
        }
      }
      return event;
    }));
  }, [volunteers]);

  const removeVolunteerFromEvent = useCallback((eventId, volunteerId) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          volunteers: event.volunteers.filter(v => v.id !== volunteerId)
        };
      }
      return event;
    }));
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'volunteers', label: 'Voluntarios', icon: Users },
    { id: 'announcements', label: 'Anuncios', icon: Bell },
    { id: 'prayer', label: 'Oración', icon: Heart }
  ];

  const renderCurrentView = () => {
    switch(currentView) {
      case 'dashboard': 
        return <Dashboard 
          events={events} 
          volunteers={volunteers} 
          announcements={announcements} 
          prayerRequests={prayerRequests}
          openImageModal={openImageModal}
        />;
      case 'calendar': 
        return <CalendarView 
          events={events}
          volunteers={volunteers}
          newEvent={newEvent}
          handleEventChange={handleEventChange}
          handleImageUpload={handleImageUpload}
          addEvent={addEvent}
          enrollVolunteer={enrollVolunteer}
          removeVolunteerFromEvent={removeVolunteerFromEvent}
          openImageModal={openImageModal}
        />;
      case 'volunteers': 
        return <VolunteersView 
          volunteers={volunteers}
          setVolunteers={setVolunteers}
          newVolunteer={newVolunteer}
          handleVolunteerChange={handleVolunteerChange}
          addVolunteer={addVolunteer}
        />;
      case 'announcements': 
        return <AnnouncementsView 
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          newAnnouncement={newAnnouncement}
          handleAnnouncementChange={handleAnnouncementChange}
          handleImageUpload={handleImageUpload}
          addAnnouncement={addAnnouncement}
          openImageModal={openImageModal}
        />;
      case 'prayer': 
        return <PrayerView 
          prayerRequests={prayerRequests}
          setPrayerRequests={setPrayerRequests}
          newPrayerRequest={newPrayerRequest}
          handlePrayerChange={handlePrayerChange}
          addPrayerRequest={addPrayerRequest}
        />;
      default: 
        return <Dashboard 
          events={events} 
          volunteers={volunteers} 
          announcements={announcements} 
          prayerRequests={prayerRequests}
          openImageModal={openImageModal}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        menuItems={menuItems}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <MobileMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        menuItems={menuItems}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <ImageModal 
        isImageModalOpen={isImageModalOpen}
        selectedImage={selectedImage}
        closeImageModal={closeImageModal}
      />
      <main className="pb-6">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default ChurchManagementApp;